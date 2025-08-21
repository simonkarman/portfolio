export type File = {
  explain(): string;
  exists(): Promise<boolean>;
  read(): Promise<string>;
  write(data: string): Promise<void>;
  ageMs(): Promise<number>;
}
