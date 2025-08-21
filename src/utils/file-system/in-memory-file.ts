import { File } from './file';

export class InMemoryFile implements File {
  private lastModified: Date;
  private content: string | undefined;

  constructor(content?: string) {
    this.lastModified = new Date();
    this.content = content;
  }

  explain(): string {
    return 'in-memory file';
  }

  async exists(): Promise<boolean> {
    return this.content !== undefined;
  }

  async read(): Promise<string> {
    return this.content!;
  }

  async write(data: string): Promise<void> {
    this.lastModified = new Date();
    this.content = data;
  }

  async ageMs(): Promise<number> {
    return Date.now() - this.lastModified.getTime();
  }
}
