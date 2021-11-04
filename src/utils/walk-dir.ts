import { join } from 'path';
import { readdir } from 'fs/promises';
import { capFirst } from './cap-first';

export interface PathElement {
  name: string,
  path: string,
  depth: number,
  contents: Array<PathElement>,
  isDir: boolean,
}

export const walkDir = async (basePath: string, path: string, depth = 0): Promise<Array<PathElement>> => {
  const contents: Array<PathElement> = [];
  const dirents = await readdir(join(basePath, path), { withFileTypes: true });

  for (const dirent of dirents) {
    const pathElement: PathElement = {
      depth,
      name: capFirst(dirent.name.replace('.md', '').replace(/[_-]/g, ' ')),
      path: `./${join(path, dirent.name).replace(/\\/g, '/')}`,
      isDir: dirent.isDirectory(),
      contents: [],
    };

    if (pathElement.isDir) {
      pathElement.contents = await walkDir(basePath, join(path, dirent.name), depth + 1);
    }

    contents.push(pathElement);
  }

  return contents;
};
