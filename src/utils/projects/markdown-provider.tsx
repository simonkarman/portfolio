import * as fs from 'node:fs';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import CodeBlockWithCopy from '@/components/code-block-with-copy';
import { ReactElement } from 'react';
import { Provider } from './provider';
import { Project } from './project';

import 'highlight.js/styles/github.min.css';

export class MarkdownProvider implements Provider {
  async getProjects(): Promise<Project[]> {
    // TODO: get projects from projects/**.md
    return [
      {
        providerName: 'markdown',
        name: 'markdown-test',
        title: 'Markdown',
        date: '2025-05-06',
        contributors: 'Simon Karman',
        description: 'Testing markdown syntax on my portfolio website.',
        tags: ['markdown'],
        image: 'https://mdg.imgix.net/assets/images/vscode.png',
      },
      {
        providerName: 'markdown',
        name: 'advent-of-code-2023a',
        title: 'Advent of Code 2023',
        date: '2023-12-01',
        contributors: 'Simon Karman',
        description: 'Solutions to Advent of Code 2023 written in Rust.',
        tags: ['advent-of-code', 'rust'],
        image: 'https://images.ctfassets.net/r26fkm24j6bh/6HyMzsG8xJqCasVDez9nxB/31b49bb3b9f9d2bfef853f16bba75c27/game-dark.png',
      },
    ];
  }

  render(project: Project): ReactElement {
    const content = fs.readFileSync(`projects/${project.name}.md`, 'utf-8');
    return <div className='bg-white'>
      <div className='container mx-auto p-5'>
        <div className='prose prose-lg prose-pre:p-0 prose-pre:border prose-pre:border-gray-100'>
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
        </div>
      </div>
    </div>;
  }
}
