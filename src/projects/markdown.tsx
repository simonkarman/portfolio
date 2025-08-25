import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import CodeBlockWithCopy from '@/components/code-block-with-copy';
import ReactMarkdown from 'react-markdown';

import 'highlight.js/styles/github.min.css';
import Image from 'next/image';

export const Markdown = (rootProps: {
  content: string,
  urlTransformer?: (type: 'image' | 'link', url: string) => string,
}) => {
  return <div
    className='mx-auto prose prose-lg
             prose-pre:p-2 prose-pre:border prose-pre:border-gray-100 prose-pre:bg-gray-50
             prose-img:mx-auto prose-img:max-h-[60vh] prose-img:max-w-[90%] prose-img:rounded-lg prose-img:border'
  >
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
      remarkPlugins={[remarkGfm]}
      components={{
        pre: ({ children, ...props }) => {
          return <CodeBlockWithCopy {...props}>{children}</CodeBlockWithCopy>;
        },
        img: ({ src, alt, ...props }) => {
          if (typeof src !== 'string') {
            // eslint-disable-next-line @next/next/no-img-element
            return <img src={src} alt={alt} {...props} />;
          }
          const imageUrl = rootProps.urlTransformer ? rootProps.urlTransformer('image', src) : src;
          const altText = alt ?? imageUrl.split('/').pop()?.split('?')[0] ?? 'Image';
          return <Image
            width={650}
            height={650}
            className='w-auto h-auto object-contain bg-gray-100'
            src={imageUrl}
            alt={altText}
          />;
        },
        a: ({ href, children, ...props }) => {
          if (typeof href !== 'string') {
            return <a {...props}>{children}</a>;
          }
          const linkUrl = rootProps.urlTransformer ? rootProps.urlTransformer('link', href) : href;
          return <a href={linkUrl} target='_blank' rel='noopener noreferrer' {...props}>
            {children}
          </a>;
        },
      }}
    >
      {rootProps.content}
    </ReactMarkdown>
  </div>;
};
