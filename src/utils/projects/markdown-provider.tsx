import * as fs from 'node:fs';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import CodeBlockWithCopy from '@/components/code-block-with-copy';
import { ReactElement } from 'react';
import matter from 'gray-matter';
import path from 'node:path';
import { Provider } from './provider';
import { Project, ProjectSchema } from './project';

import 'highlight.js/styles/github.min.css';

export class MarkdownProvider implements Provider {
  private directory = 'projects/markdown';

  async getProjects(): Promise<Project[]> {
    console.info('markdown provider - get projects cwd:', process.cwd());
    return fs.readdirSync(path.join(process.cwd(), this.directory))
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const content = fs.readFileSync(`${this.directory}/${file}`, 'utf-8');
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
    console.info('markdown provider - render cwd:', process.cwd());
    const file = fs.readFileSync(path.join(process.cwd(), `${this.directory}/${project.slug}.md`), 'utf-8');
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
