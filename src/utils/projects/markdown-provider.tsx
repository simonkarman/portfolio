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
    const projectMarkdownDirectoryPath = path.join(process.cwd(), this.directory);
    return fs.readdirSync(projectMarkdownDirectoryPath)
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const content = fs.readFileSync(`${this.directory}/${file}`, 'utf-8');
        const data = matter(content).data;
        const slug = file.slice(0, file.length - 3);
        const safeProject = ProjectSchema.safeParse({ ...data, slug });
        if (!safeProject.success) {
          console.error(`Markdown Provider found invalid markdown file: ${file}. Reason: ${safeProject.error}`);
        }
        return safeProject;
      })
      .filter(safeProject => safeProject.success)
      .map(safeProject => ({
        ...safeProject.data!,
        providerName: 'markdown',
      }));
  }

  render(project: Project): ReactElement {
    const projectMarkdownFilePath = path.join(process.cwd(), `${this.directory}/${project.slug}.md`);
    const file = fs.readFileSync(projectMarkdownFilePath, 'utf-8');
    const { content } = matter(file);
    return <div className='mx-auto prose prose-lg
                           prose-pre:p-2 prose-pre:border prose-pre:border-gray-100 prose-pre:bg-gray-50
                           prose-img:mx-auto prose-img:max-h-[60vh] prose-img:max-w-[90%] prose-img:rounded-lg prose-img:border
                           '>
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
