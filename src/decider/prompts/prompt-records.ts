import prompts from 'prompts';

import { capFirst } from '../../utils';
import { exitIfNoValue } from './exit-if-no-value';
import { DecisionRecord } from '../records/decision-record';

export const promptRecords = async (records: DecisionRecord[]): Promise<DecisionRecord[]> => {
  const { replacedRecords }: { replacedRecords: DecisionRecord[] } = await prompts([{
    type: 'autocompleteMultiselect',
    name: 'replacedRecords',
    message: 'Select records which should be replaced:',
    hint: 'Space to select. Return to submit',
    instructions: false,
    choices: records.map((value) => ({
      title: `[${value.statusIcon} ${capFirst(value.status)}] ${value.id} ${value.title}`,
      value,
    })),
  }]);

  exitIfNoValue(replacedRecords);

  return replacedRecords;
};
