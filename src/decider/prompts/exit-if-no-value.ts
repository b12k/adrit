import { exit } from 'process';

export const exitIfNoValue = (value: unknown): void | never => {
  if (value === undefined) {
    console.log('Aborted.');
    return exit();
  }
};
