import { format } from 'date-fns';

import {
  Status,
  config,
} from '../config';

export interface DecisionRecordData {
  number: number;
  title: string;
  status: Status;
}

export interface DecisionRecordConfig {
  idPrefix: string;
  separator: string;
  idNumCount: number;
  spaceReplacer: string;
}

export class DecisionRecord {
  public status: Status;

  public replacedBy?: DecisionRecord;

  public previousStatus?: Status;

  public replacedRecords: DecisionRecord[] = [];

  public readonly id: string;

  public readonly title: string;

  public readonly number: number;

  private readonly idPrefix = config.idPrefix;

  private readonly idNumCount = config.idNumPad;

  constructor(recordOrFileName: DecisionRecordData | string) {
    const record = typeof recordOrFileName === 'string'
      ? this.parseFileName(recordOrFileName)
      : recordOrFileName;

    const idPadded = record.number.toString().padStart(this.idNumCount, '0');

    this.id = `${this.idPrefix}${idPadded}`;
    this.number = record.number;
    this.title = record.title;
    this.status = record.status;
  }

  private parseFileName(fileName: string): DecisionRecordData {
    const [
      status,
      idPrefixed,
      title,
    ] = fileName.split(config.fileNameSegmentsSeparator);

    if (!status || !idPrefixed || !title) {
      throw new Error(`Bad string format: "${fileName}"`);
    }

    const spacerRegExp = new RegExp(config.fileNameSpaceReplacer, 'g');

    return {
      title: title.replace(spacerRegExp, ' '),
      number: Number(idPrefixed.replace(config.idPrefix, '')),
      status: status as Status,
    };
  }

  private computeFileName(isPreviousStatus = false) {
    const status = isPreviousStatus && this.previousStatus
      ? this.previousStatus
      : this.status;
    const slug = [
      status,
      this.id,
      this.title.replace(/ /g, config.fileNameSpaceReplacer),
    ].join(config.fileNameSegmentsSeparator);

    return `${slug}${config.fileExt}`;
  }

  get date() {
    return format(new Date(), config.dateFormat);
  }

  get fileName() {
    return this.computeFileName();
  }

  get previousFileName() {
    return this.computeFileName(true);
  }

  get statusIcon() {
    return config.statusIcon[this.status];
  }
}
