'use server';

import { Provider } from './provider';
import { MarkdownProvider } from './markdown-provider';

const providers = {
  'markdown': new MarkdownProvider('projects/markdown'),
} as const satisfies { [key: string]: Provider };

export async function getProviders(){
  return providers;
}

export type ProviderName = keyof typeof providers;
