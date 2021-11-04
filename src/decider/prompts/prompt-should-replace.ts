import prompts from 'prompts';

import { exitIfNoValue } from './exit-if-no-value';

export const promptShouldReplace = async (): Promise<boolean> => {
  const { shouldReplace }: { shouldReplace: boolean } = await prompts([{
    type: 'toggle',
    name: 'shouldReplace',
    message: 'Should this record replace another record/s?',
    initial: false,
    active: 'yes',
    inactive: 'no',
  }]);

  exitIfNoValue(shouldReplace);

  return shouldReplace;
};
