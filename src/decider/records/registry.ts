import { noop } from 'lodash';

import { config } from '../config';
import { DecisionRecord } from './decision-record';
export class Registry {
  public readonly records: DecisionRecord[];

  constructor(fileNames: string[]) {
    this.records = fileNames.reduce<DecisionRecord[]>((acc, next) => {
      try {
        acc.push(new DecisionRecord(next));
      } catch (error) {
        noop(error);
      }

      return acc;
    }, []);
  }

  get editableRecords() {
    return this.records
      .filter((item) => config.editableStatuses.includes(item.status))
      .sort((a, b) => a.number - b.number);
  }
}
