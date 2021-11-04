import nunjucks from 'nunjucks';
import {
  unlink,
  readFile,
  writeFile,
} from 'fs/promises';

import { config } from '../config';
import { capFirst } from '../../utils';
import { DecisionRecord } from './decision-record';
import { getRecordFilePath } from './get-record-file-path';

type Section = keyof typeof config['templateSectionMarkers'];

const replacers = (Object.keys(config.templateSectionMarkers) as Section[])
  .reduce((acc, next) => {
    const [
      start,
      end,
    ] = config.templateSectionMarkers[next];
    const regExp = `(?<=(${start}))(.|\n)*?(?=(${end}))`;
    acc[next] = new RegExp(regExp, 'g');
    return acc;
  }, {} as Record<Section, RegExp>);

export const createRecordFile = (record: DecisionRecord) => {

  const fileContents = nunjucks
    .render(config.templatePath, { record })
    .replace(/^\n{2,}/gm, '\n');

  const filePath = getRecordFilePath(record);

  writeFile(filePath, fileContents);
};

export const updateRecordFile = async (record: DecisionRecord) => {
  let filePath = getRecordFilePath(record, true);
  let fileContents;

  fileContents = await readFile(filePath, 'utf8');

  if (record.previousStatus && record.status !== record.previousStatus) {
    await unlink(filePath);
    filePath = getRecordFilePath(record);
  }

  fileContents = fileContents
    .replace(replacers.date, record.date)
    .replace(replacers.status, `${record.statusIcon} ${capFirst(record.status)}`);

  if (record.replacedBy) {
    fileContents = fileContents
      .replace(
        replacers.replacedBy,
        `[${record.replacedBy.id} ${record.replacedBy.title}](./${record.replacedBy.fileName})`,
      );
  }

  if (record.replacedRecords.length) {
    const replacedRecordsMarkdown = record
      .replacedRecords
      .map((item) => `- [${item.id} ${item.title}](./${item.fileName})`)
      .join('\n');

    fileContents = fileContents
      .replace(replacers.replacedRecords, replacedRecordsMarkdown);
  }


  await writeFile(filePath, fileContents);
};
