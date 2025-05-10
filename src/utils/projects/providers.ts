'use server';

import { Provider } from './provider';
import { MarkdownProvider } from './markdown-provider';
import { MdxProvider } from './mdx-provider';

const providers = {
  'markdown': new MarkdownProvider(),
  'mdx': new MdxProvider(),
} as const satisfies { [key: string]: Provider };

export async function getProviders(){
  return providers;
}

export type ProviderName = keyof typeof providers;
