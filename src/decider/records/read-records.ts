import { readdir } from 'fs/promises';

import { config } from '../config';

export const readRecords = async (): Promise<string[]> => {
  const files = await readdir(config.recordsFolderPath);

  return files.map((file) => file.replace(config.fileExt, ''));
};
