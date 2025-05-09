import type { MDXComponents } from 'mdx/types';
import CodeBlockWithCopy from '@/components/code-block-with-copy';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: ({ children, ...props }) => {
      return <CodeBlockWithCopy {...props}>{children}</CodeBlockWithCopy>;
    },
    ...components,
  };
}
