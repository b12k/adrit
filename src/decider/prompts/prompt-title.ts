import prompts from 'prompts';

import { exitIfNoValue } from './exit-if-no-value';

export const promptTitle = async (): Promise<string> => {
  const { title }: { title: string } = await prompts([{
    type: 'text',
    name: 'title',
    message: 'Provide record title:',
  }]);

  exitIfNoValue(title);

  return title.trim().replace(/[^\d A-Za-z]+/g, ' ');
};
