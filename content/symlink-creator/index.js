#!/usr/bin/env node

import fs from 'node:fs';

const directories = fs.readdirSync('../markdown', { withFileTypes: true }).filter(d => d.isDirectory());
for (let directory of directories) {
  const contentDir = `../markdown/${directory.name}/public`;
  if (fs.existsSync(contentDir) && fs.lstatSync(contentDir).isDirectory()) {
    const publicDir = `../../public/content/${directory.name}`;
    console.info('Creating symlink for:', contentDir, publicDir);
    try {
      fs.symlinkSync(contentDir, publicDir);
    } catch (err) {
      if (err.code === 'EEXIST') {
        continue;
      }
      console.error(err);
    }

    // const stats = fs.lstatSync(publicDir);
    // if (stats.isSymbolicLink()) {
    //   console.info(stats);
    //   continue;
    // }
    // console.warn(`Symlink for ${publicDir} cannot be made... A file or directory with that name already exists.`);
  }
}
