import { cwd } from 'process';
import { resolve } from 'path';

import { config } from '../config';
import { DecisionRecord } from './decision-record';

export const getRecordFilePath = (
  record: DecisionRecord,
  isPreviousFileName = false,
) => resolve(
  cwd(),
  config.recordsFolderPath,
  isPreviousFileName ? record.previousFileName : record.fileName,
);
