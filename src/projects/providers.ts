'use server';

import { Provider } from './provider';
import { ContentfulProvider } from '@/projects/contentful-provider/contentful-provider';
import { MarkdownProvider } from './markdown-provider/markdown-provider';
import { MdxProvider } from '@/projects/mdx-provider/mdx-provider';

const providers = {
  'contentful': new ContentfulProvider(),
  'markdown': new MarkdownProvider(),
  'mdx': new MdxProvider(),
} as const satisfies { [key: string]: Provider };

export async function getProviders(){
  return providers;
}

export type ProviderName = keyof typeof providers;
