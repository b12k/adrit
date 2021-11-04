import prompts from 'prompts';

import { capFirst } from '../../utils';
import { exitIfNoValue } from './exit-if-no-value';
import { DecisionRecord } from '../records/decision-record';

export const promptRecord = async (records: DecisionRecord[]): Promise<DecisionRecord> => {
  const { record } : { record: DecisionRecord } = await prompts([{
    type: 'autocomplete',
    name: 'record',
    message: 'Select record to edit',
    choices: records.map((value) => ({
      title: `[${value.statusIcon} ${capFirst(value.status)}] ${value.id} ${value.title}`,
      value,
    })),
  }]);

  exitIfNoValue(record);

  return record;
};
