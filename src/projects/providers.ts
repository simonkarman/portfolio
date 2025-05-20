'use server';

import { Provider } from './provider';
import { ContentfulProvider } from '@/projects/contentful-provider/contentful-provider';

const providers = {
  'contentful': new ContentfulProvider(),
  // 'github': new GithubProvider(),
  // 'markdown': new MarkdownProvider(),
  // 'mdx': new MdxProvider(),
} as const satisfies { [key: string]: Provider };

export async function getProviders(){
  return providers;
}

export type ProviderName = keyof typeof providers;
