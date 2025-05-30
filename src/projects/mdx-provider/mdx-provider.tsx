import * as fs from 'node:fs';
import { ReactElement } from 'react';
import path from 'node:path';
import dynamic from 'next/dynamic';
import { Provider } from '../provider';
import { ProjectSchema, ProjectWithoutProviderName } from '../project';

import 'highlight.js/styles/github.min.css';

/**
 * MdxProvider looks through the 'content/mdx' directory and finds:
 *  1) all .mdx files in the directory
 *  2) index.mdx files in subdirectories
 *
 * It uses the exported metadata const in that .mdx file to find the metadata about the project.
 */
export class MdxProvider implements Provider {
  private readonly directory = 'content/mdx';

  async getProjects(): Promise<ProjectWithoutProviderName[]> {
    const projectMarkdownDirectoryPath = path.join(process.cwd(), this.directory);
    return fs.readdirSync(projectMarkdownDirectoryPath, { withFileTypes: true })
      .filter(file =>
        // a md file such as example1.md (slug: example1)
        (file.isFile() && file.name.endsWith('.mdx'))
        // a directory with a index.md file such as example2/index.md (slug: example2)
        || (file.isDirectory() && fs.existsSync(path.join(process.cwd(), this.directory, file.name, 'index.mdx'))),
      )
      .map(file => {
        const contentPath = file.isDirectory() ? file.name + '/index.mdx' : file.name;
        const slug = file.isDirectory() ? file.name : file.name.slice(0, file.name.length - 4);

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const metadata = require(`../../../content/mdx/${contentPath}`).metadata;

        const safeProject = ProjectSchema.safeParse({ ...metadata, slug });
        if (!safeProject.success) {
          console.error(`Mdx Provider found invalid mdx file: ${file.name}. Reason: ${safeProject.error}`);
        }
        return safeProject;
      })
      .filter(safeProject => safeProject.success)
      .map(safeProject => safeProject.data!);
  }

  async render(project: ProjectWithoutProviderName): Promise<ReactElement> {
    const repositoryPath = `${this.directory}/${project.slug}`;
    const fullPath = path.join(process.cwd(), repositoryPath);
    const isDirectory = fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory();

    const contentPath = project.slug + (isDirectory ? '/index.mdx' : '.mdx');
    const Content = dynamic(() => import((`../../../content/mdx/${contentPath}`)));
    return <Content />;
  }
}
