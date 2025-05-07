import * as fs from 'node:fs';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import CodeBlockWithCopy from '@/components/code-block-with-copy';
import { ReactElement } from 'react';
import { Provider } from './provider';
import { Project, ProjectSchema } from './project';

import 'highlight.js/styles/github.min.css';
import matter from 'gray-matter';

export class MarkdownProvider implements Provider {
  async getProjects(): Promise<Project[]> {
    return fs.readdirSync('projects')
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const content = fs.readFileSync(`projects/${file}`, 'utf-8');
        const data = matter(content).data;
        const slug = file.slice(0, file.length - 3);
        return ProjectSchema.safeParse({ ...data, slug });
      })
      .filter(safeProject => {
        if (!safeProject.success) {
          console.error(`Invalid project data: ${safeProject.error}`);
          return false;
        }
        return safeProject.success;
      })
      .map(safeProject => ({
        ...safeProject.data!,
        providerName: 'markdown',
      }));
  }

  render(project: Project): ReactElement {
    const file = fs.readFileSync(`projects/${project.slug}.md`, 'utf-8');
    const { content } = matter(file);
    return <div className='mx-auto prose prose-lg prose-pre:p-0 prose-pre:border prose-pre:border-gray-100'>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
        components={{
          pre: ({ children, ...props }) => {
            return <CodeBlockWithCopy {...props}>{children}</CodeBlockWithCopy>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>;
  }
}
