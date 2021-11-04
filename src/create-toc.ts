import { join } from 'path';
import { repeat } from 'lodash';
import { writeFile } from 'fs/promises';

import {
  walkDir,
  PathElement,
} from './utils';

const outputFile = join(__dirname, '../README.md');

const createMarkdown = (entries: Array<PathElement>) => entries
  .sort((a, b) => Number(a.isDir) - Number(b.isDir))
  .reduce<string>((acc, next) => {
  if (next.isDir) {
    acc += `\n${repeat('#', next.depth + 2)} 📂 [${next.name}](${next.path})\n`;
    acc += createMarkdown(next.contents);
  } else {
    acc += `\n- 🧾 [${next.name}](${next.path})\n`;
  }
  return acc;
}, '');

(async () => {
  const contents = await walkDir(join(__dirname, '..'), './docs');
  const markdown = '# 👨‍💻 AutoScout24 Development\n\n**Table of contents:**\n' + createMarkdown(contents);

  await writeFile(outputFile, markdown);
})();



