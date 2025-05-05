export type PageProps<T extends { [key: string]: string }> = {
  params: Promise<T>,
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>,
}
