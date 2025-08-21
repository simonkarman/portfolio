import { File } from '@/utils/file-system/file';
import { existsSync, readFileSync } from 'node:fs';
import fs from 'fs/promises';

export class LocalFile implements File {
  constructor(
    private readonly fileName: string,
  ) {
  }

  explain(): string {
    return `local file at ${this.fileName}`;
  }

  async exists(): Promise<boolean> {
    return existsSync(this.fileName);
  }

  read(): Promise<string> {
    return fs.readFile(this.fileName, 'utf-8');
  }

  readSync(): string {
    return readFileSync(this.fileName, 'utf-8');
  }

  async write(data: string): Promise<void> {
    await fs.writeFile(this.fileName, data, 'utf-8');
  }

  async ageMs(): Promise<number> {
    const stats = await fs.stat(this.fileName);
    return Date.now() - stats.mtimeMs;
  }
}
