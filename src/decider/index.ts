import { cwd } from 'process';
import { noop } from 'lodash';
import openEditor from 'open-editor';
import { resolve } from 'path';

import { Registry } from './records/registry';
import { readRecords } from './records/read-records';
import { DecisionRecord } from './records/decision-record';
import {
  config,
  Status,
} from './config';
import {
  Action,
  promptTitle,
  promptAction,
  promptRecord,
  promptStatus,
  promptRecords,
  promptShouldReplace,
} from './prompts';
import {
  createRecordFile,
  updateRecordFile,
} from './records/file-system';

async function main() {
  const [ action, fileNames ] = await Promise.all([
    promptAction(),
    readRecords(),
  ]);

  const isNewRecord = action === Action.CREATE;
  const registry = new Registry(fileNames);
  let record = {} as DecisionRecord;

  if (isNewRecord) {
    const title = await promptTitle();
    const status = await promptStatus();

    record = new DecisionRecord({
      number: registry.records.length + 1,
      title,
      status,
    });

  } else {
    record = await promptRecord(registry.editableRecords);
    const newStatus = await promptStatus(record.status);
    if (record.status !== newStatus) {
      record.previousStatus = record.status;
      record.status = newStatus;
    }
  }

  const replacableRecords = registry
    .editableRecords
    .filter((item) => item.id !== record.id);
  const shouldReplace = record.status === Status.ACCEPTED
    && replacableRecords.length
    && await promptShouldReplace();

  if (shouldReplace) {
    record.replacedRecords = await promptRecords(replacableRecords);
    record.replacedRecords = record.replacedRecords
      .map((item) => {
        item.replacedBy = record;
        return item;
      });

    record.replacedRecords = record.replacedRecords
      .map((item) => {
        item.previousStatus = item.status;
        item.status = Status.REPLACED;
        return item;
      });

    const editPromises = record.replacedRecords
      .map((item) => updateRecordFile(item));

    await Promise.all(editPromises);

  }

  await (isNewRecord ? createRecordFile(record) : updateRecordFile(record));

  const filePath = resolve(cwd(), config.recordsFolderPath, record.fileName);

  if (config.openEditor) {
    try {
      openEditor([
        {
          file: filePath,
          line: 8,
          column: 1,
        },
      ], {
        editor: 'code',
      });
    } catch (error) {
      noop(error);
    }
  }

  console.log(`Done: ${filePath}`);

}

main().catch((error) => { console.log('Exited', error.message); });
