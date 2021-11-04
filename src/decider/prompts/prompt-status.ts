import prompts from 'prompts';

import { capFirst } from '../../utils';
import { exitIfNoValue } from './exit-if-no-value';
import {
  config,
  Status,
} from '../config';

export const promptStatus = async (currentStatus?: Status): Promise<Status> => {
  const nextStatuses = currentStatus
    ? config.nextStatuses[currentStatus]
    : config.nextStatuses['new'];

  const statuses = nextStatuses || [];

  const { status }: { status: Status } = await prompts([{
    type: 'select',
    name: 'status',
    message: 'Select status for the record',
    choices: statuses.map((value) => ({
      title: capFirst(value),
      value,
    })),
  }]);

  exitIfNoValue(status);

  return status;
};
