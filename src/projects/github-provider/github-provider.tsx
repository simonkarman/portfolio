/* eslint-disable no-process-env */
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import CodeBlockWithCopy from '@/components/code-block-with-copy';
import { ReactElement } from 'react';
import { Octokit } from '@octokit/rest';
import { Provider } from '../provider';
import { ProjectSchema, ProjectWithoutProviderName } from '../project';
import { getRepositoryImageUrl } from './get-repository-image-url';

import 'highlight.js/styles/github.min.css';

/**
 * GithubProvider gets Git repository and presents them as projects and renders their simonkarman.md or README.md content as markdown.
 */
export class GithubProvider implements Provider {
  private readonly client: Octokit;

  constructor() {
    this.client = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
  }

  async getProjects(): Promise<ProjectWithoutProviderName[]> {
    const repos = await this.client.rest.repos.listForAuthenticatedUser({
      per_page: 250,
    });
    const repositoriesAsProjects = await Promise.all(repos.data
      .filter(repo => repo.owner.login === 'simonkarman' && !repo.private)
      .map(async (repo) => {
      // Check if the repository has an image file in the root directory of the main branch
        const image = await getRepositoryImageUrl(this.client, repo);
        const project: ProjectWithoutProviderName = {
          slug: 'github-' + repo.name.replace(/[^a-zA-Z0-9]/g, '-'), // TODO: remove this prefix and ensure that github has lowest priority when other providers find the same slug
          title: repo.name, // TODO: use actual title (for example from README.md) instead of slug
          contributors: 'Simon Karman', // TODO: get from github committers
          description: repo.description || '', // TODO: strip out markdown syntax (mostly urls)
          image: image ?? '/card.jpg', // TODO: verify that this token image is valid long enough, and add a better placeholder
          date: repo.created_at?.substring(0, 10) || '', // TODO: use first commit date instead
          tags: ['github', repo.language?.replaceAll('+', 'plus').replaceAll('#', 'sharp').toLowerCase() ?? 'language'], // TODO: make sure that the tags are valid and don't use 'language'
          repository: repo.html_url,
          download: undefined, // TODO: check if a release exists and use that instead
          documentation: repo.has_pages ? `https://simonkarman.github.io/${repo.name}` : undefined,
          demo: undefined, // TODO: check if the README.md mentions a link to a demo / live / hosted website
        };
        const safeProject = ProjectSchema.safeParse(project);
        if (!safeProject.success) {
          console.error(`Github Provider found invalid repository: ${repo.name}. Reason: ${safeProject.error}`);
        }
        return safeProject;
      }),
    );
    return repositoriesAsProjects
      .filter(safeProject => safeProject.success)
      .map(safeProject => safeProject.data!);
  }

  async render(project: ProjectWithoutProviderName): Promise<ReactElement> {
    const repo = project.slug.slice('github-'.length); // TODO: remove this prefix and ensure that github has lowest priority when other providers find the same slug
    const readme = await this.client.rest.repos.getReadme({
      owner: 'simonkarman',
      repo,
    });
    const content = Buffer.from(readme.data.content, 'base64').toString('utf-8');

    // TODO: check if content starts with the title, and remove it
    // TODO: check if content starts with the description, and remove it
    // TODO: Replace any urls starting with / or ./ with the repository url
    // TODO: Ensure that images are also replaced

    return <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
      remarkPlugins={[remarkGfm]}
      components={{
        pre: ({ children, ...props }) => {
          return <CodeBlockWithCopy {...props}>{children}</CodeBlockWithCopy>;
        },
      }}
    >
      {content}
    </ReactMarkdown>;
  }
}
