import prompts from 'prompts';

import { exitIfNoValue } from './exit-if-no-value';

export enum Action {
  CREATE = 'create',
  EDIT = 'edit',
}

export const promptAction = async (): Promise<Action> => {
  const { action } = await prompts([{
    type: 'select',
    name: 'action',
    message: 'What do you want to do?',
    choices: [
      {
        title: 'Create record',
        value: Action.CREATE,
      },
      {
        title: 'Edit record',
        value: Action.EDIT,
      },
    ],
    initial: 0,
  }]);

  exitIfNoValue(action);

  return action as Action;
};
