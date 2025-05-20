import * as fs from 'node:fs';
import { ReactElement } from 'react';
import matter from 'gray-matter';
import path from 'node:path';
import { Markdown } from '@/projects/markdown';
import { Provider } from '../provider';
import { ProjectSchema, ProjectWithoutProviderName } from '../project';

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
    const projectMarkdownDirectoryPath = path.join(process.cwd(), this.directory);
    return fs.readdirSync(projectMarkdownDirectoryPath, { withFileTypes: true })
      .filter(file =>
        // a md file such as example1.md (slug: example1)
        (file.isFile() && file.name.endsWith('.md'))
        // a directory with an index.md file such as example2/index.md (slug: example2)
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
        }
        return safeProject;
      })
      .filter(safeProject => safeProject.success)
      .map(safeProject => safeProject.data!);
  }

  async render(project: ProjectWithoutProviderName): Promise<ReactElement> {
    const projectPath = path.join(process.cwd(), `${this.directory}/${project.slug}`);
    const isDirectory = fs.existsSync(projectPath) && fs.lstatSync(projectPath).isDirectory();
    const projectMarkdownFilePath = isDirectory ? (projectPath + '/index.md') : (projectPath + '.md');
    const file = fs.readFileSync(projectMarkdownFilePath, 'utf-8');
    const { content } = matter(file);
    return <Markdown content={content} />;
  }
}
