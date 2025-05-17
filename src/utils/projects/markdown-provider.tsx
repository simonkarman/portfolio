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
import { ProjectSchema, ProjectWithoutProviderName } from './project';

import 'highlight.js/styles/github.min.css';
import { transformImageSrc } from '@/utils/projects/public';

const createMarkdownSymlinks = () => {
  fs.mkdirSync('public/content/', { recursive: true });
  const directories = fs.readdirSync('content/markdown', { withFileTypes: true }).filter(d => d.isDirectory());
  for (const directory of directories) {
    const contentDir = `content/markdown/${directory.name}/public`;
    if (fs.existsSync(contentDir) && fs.lstatSync(contentDir).isDirectory()) {
      const publicDir = `public/content/${directory.name}`;
      console.info('Creating symlink for:', contentDir, publicDir);
      try {
        fs.symlinkSync(contentDir, publicDir);
      } catch (err: unknown) {
        if (typeof err === 'object' && err && 'code' in err && err.code === 'EEXIST') {
          continue;
        }
        console.error(err);
      }

      // const stats = fs.lstatSync(publicDir);
      // if (stats.isSymbolicLink()) {
      //   console.info(stats);
      //   continue;
      // }
      // console.warn(`Symlink for ${publicDir} cannot be made... A file or directory with that name already exists.`);
    }
  }
};

/**
 * MarkdownProvider looks through the 'content/markdown' directory and finds:
 *  1) all .md files in the directory
 *  2) index.md files in subdirectories
 *
 * It uses the FrontMatter in that .md file to find the metadata about the project.
 */
export class MarkdownProvider implements Provider {
  private readonly directory = 'content/markdown';

  async getProjects(): Promise<ProjectWithoutProviderName[]> {
    createMarkdownSymlinks(); // TODO: can this be done only once at build time (and everytime in dev mode?)

    const projectMarkdownDirectoryPath = path.join(process.cwd(), this.directory);
    return fs.readdirSync(projectMarkdownDirectoryPath, { withFileTypes: true })
      .filter(file =>
        // a md file such as example1.md (slug: example1)
        (file.isFile() && file.name.endsWith('.md'))
        // a directory with a index.md file such as example2/index.md (slug: example2)
        || (file.isDirectory() && fs.existsSync(path.join(process.cwd(), this.directory, file.name, 'index.md'))),
      )
      .map(file => {
        const contentPath = file.isDirectory() ? file.name + '/index.md' : file.name;
        const slug = file.isDirectory() ? file.name : file.name.slice(0, file.name.length - 3);

        const content = fs.readFileSync(`${this.directory}/${contentPath}`, 'utf-8');
        const data = matter(content).data;

        const safeProject = ProjectSchema.safeParse({ ...data, slug });
        if (!safeProject.success) {
          console.error(`Markdown Provider found invalid markdown file: ${file.name}. Reason: ${safeProject.error}`);
        } else {
          safeProject.data.image = transformImageSrc(safeProject.data.slug, safeProject.data.image);
          safeProject.data.download = transformImageSrc(safeProject.data.slug, safeProject.data.download);
        }
        return safeProject;
      })
      .filter(safeProject => safeProject.success)
      .map(safeProject => safeProject.data!);
  }

  render(project: ProjectWithoutProviderName): ReactElement {
    const projectPath = path.join(process.cwd(), `${this.directory}/${project.slug}`);
    const isDirectory = fs.existsSync(projectPath) && fs.lstatSync(projectPath).isDirectory();
    const projectMarkdownFilePath = isDirectory ? (projectPath + '/index.md') : (projectPath + '.md');
    const file = fs.readFileSync(projectMarkdownFilePath, 'utf-8');
    const { content } = matter(file);
    return <div
      className='mx-auto prose prose-lg
                 prose-pre:p-2 prose-pre:border prose-pre:border-gray-100 prose-pre:bg-gray-50
                 prose-img:mx-auto prose-img:max-h-[60vh] prose-img:max-w-[90%] prose-img:rounded-lg prose-img:border'
    >
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ children, src, ...props }) => {
            return <img src={transformImageSrc(project.slug, src)} {...props}>{children}</img>;
          },
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
