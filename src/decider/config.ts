export enum Status {
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  PROPOSED = 'proposed',
  REPLACED = 'replaced',
  DEPRECATED = 'deprecated',
}

type TemplateSectionMarkerStart = `<!--${string}:start-->\n\n`;
type TemplateSectionMarkerEnd = `\n\n<!--${string}:end-->`;
type TemplateSectionMarkers = [TemplateSectionMarkerStart, TemplateSectionMarkerEnd];

export interface Config {
  fileExt: string;
  idNumPad: 4;
  idPrefix: string;
  dateFormat: string;
  statusIcon: Record<Status, string>;
  openEditor: boolean;
  nextStatuses: Record<string, Status[]>
  templatePath: string;
  editableStatuses: Status[];
  recordsFolderPath: string;
  fileNameSpaceReplacer: string;
  fileNameSegmentsSeparator: string;
  templateSectionMarkers: {
    date: TemplateSectionMarkers;
    status: TemplateSectionMarkers;
    replacedBy: TemplateSectionMarkers;
    replacedRecords: TemplateSectionMarkers;
  }
}

export const config: Config = {
  fileExt: '.md',
  idNumPad: 4,
  idPrefix: 'ADR',
  dateFormat: 'yyyy.MM.dd hh:mm',
  statusIcon: {
    accepted: '👍',
    rejected: '👎',
    proposed: '🤌',
    replaced: '♻️',
    deprecated: '🗑️',
  },
  openEditor: true,
  nextStatuses: {
    new: [
      Status.ACCEPTED,
      Status.REJECTED,
      Status.PROPOSED,
    ],
    [Status.ACCEPTED]: [
      Status.DEPRECATED,
    ],
    [Status.PROPOSED]: [
      Status.ACCEPTED,
      Status.REJECTED,
      Status.DEPRECATED,
    ],
  },
  templatePath: './src/decider/records/decision-record.md',
  editableStatuses: [Status.ACCEPTED, Status.PROPOSED],
  recordsFolderPath: './docs/decision-records',
  fileNameSpaceReplacer: '_',
  fileNameSegmentsSeparator: '-',
  templateSectionMarkers: {
    date: [
      '<!--date:start-->\n\n',
      '\n\n<!--date:end-->',
    ],
    status: [
      '<!--status:start-->\n\n',
      '\n\n<!--status:end-->',
    ],
    replacedBy: [
      '<!--replaced-by:start-->\n\n',
      '\n\n<!--replaced-by:end-->',
    ],
    replacedRecords: [
      '<!--replaced-records:start-->\n\n',
      '\n\n<!--replaced-records:end-->',
    ],
  },
};
