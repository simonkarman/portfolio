'use server';

import { ProviderName } from './providers';

export type Project = {
  providerName: ProviderName,
  name: string,
  title: string,
  date: string,
  contributors: string,
  description: string,
  tags: string[],
  image: string,
}
