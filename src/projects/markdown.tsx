import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import CodeBlockWithCopy from '@/components/code-block-with-copy';
import ReactMarkdown from 'react-markdown';

import 'highlight.js/styles/github.min.css';

export const Markdown = (props: { content: string }) => {
  return <ReactMarkdown
    rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
    remarkPlugins={[remarkGfm]}
    components={{
      pre: ({ children, ...props }) => {
        return <CodeBlockWithCopy {...props}>{children}</CodeBlockWithCopy>;
      },
    }}
  >
    {props.content}
  </ReactMarkdown>;
};
