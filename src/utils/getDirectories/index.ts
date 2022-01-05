import fs from 'fs';
import path from 'path';
export const getDirectories = async (dir: string) => {
  const directory = path.resolve(dir);
  return fs.readdirSync(directory).filter(function (file) {
    return fs.statSync(directory + '/' + file).isDirectory();
  });
};
