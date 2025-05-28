/* eslint-disable no-process-env */
import { ReactElement } from 'react';
import { Octokit } from '@octokit/rest';
import { Markdown } from '@/projects/markdown';
import { Provider } from '../provider';
import { ProjectSchema, ProjectWithoutProviderName } from '../project';
import { getRepositoryImageUrl } from './get-repository-image-url';
import type { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';

type GithubRepository = RestEndpointMethodTypes['repos']['listForAuthenticatedUser']['response']['data'][number];
type GithubProject = ProjectWithoutProviderName & {
  github: GithubRepository
}

/**
 * GithubProvider gets Git repository and presents them as projects and renders their simonkarman.md or README.md content as markdown.
 */
export class GithubProvider implements Provider {
  private readonly client: Octokit;
  private readonly prefix = 'github-';
  private readonly owner = 'simonkarman';

  constructor() {
    this.client = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
  }

  async getProjects(): Promise<GithubProject[]> {
    const repos = await this.client.rest.repos.listForAuthenticatedUser({
      per_page: 250,
    });
    const repositoriesAsProjects = await Promise.all(repos.data
      .filter(repo => repo.owner.login === this.owner && !repo.private)
      .map(async (repository) => {
      // Check if the repository has an image file in the root directory of the main branch
        const image = await getRepositoryImageUrl(this.client, repository);
        const language = repository.language?.replaceAll('+', 'plus').replaceAll('#', 'sharp').toLowerCase();
        const project: ProjectWithoutProviderName = {
          slug: this.prefix + repository.name.replace(/[^a-zA-Z0-9]/g, '-'),
          title: repository.name, // TODO: use actual title (for example from README.md) instead of slug
          contributors: 'Simon Karman', // TODO: get from github committers
          description: repository.description || '', // TODO: strip out markdown syntax (mostly urls)
          image: image ?? '/card.jpg', // TODO: verify that this token image is valid long enough, and add a better placeholder
          date: repository.created_at?.substring(0, 10) || '', // TODO: use first commit date instead
          tags: language ? [language] : [], // TODO: add additional tags based on the repository content
          repository: repository.html_url,
          download: undefined, // TODO: check if a release exists and use that instead
          documentation: repository.has_pages ? `https://${this.owner}.github.io/${repository.name}` : undefined,
          demo: undefined, // TODO: check if the README.md mentions a link to a demo / live / hosted website
        };
        const safeProject = ProjectSchema.safeParse(project);
        if (!safeProject.success) {
          console.error(`Github Provider found invalid repository: ${repository.name}. Reason: ${safeProject.error}`);
          return safeProject;
        }
        return {
          success: true,
          data: {
            ...safeProject.data,
            github: repository,
          },
        };
      }),
    );
    return repositoriesAsProjects
      .filter(safeProject => safeProject.success)
      .map(safeProject => safeProject.data!);
  }

  async render(project: GithubProject): Promise<ReactElement> {
    const readme = await this.client.rest.repos.getReadme({
      owner: this.owner,
      repo: project.github.name,
    });
    const content = Buffer.from(readme.data.content, 'base64').toString('utf-8');

    // TODO: add content for stargazers, issues, forks, etc.
    // TODO: check if content starts with the title, and remove it
    // TODO: check if content starts with the description, and remove it

    const urlTransformer = (type: 'image' | 'link', url: string): string => {
      // If the URL is already absolute, return it as is
      const absolutePrefixes = ['http://', 'https://', '//', 'data:', 'blob:'];
      const isAbsoluteUrl = absolutePrefixes.some(prefix => url.startsWith(prefix));
      if (isAbsoluteUrl) {
        return url;
      }

      // If the URL is a relative path, convert it to the path on GitHub
      let path = url;
      ['/', './'].forEach(prefix => {
        if (path.startsWith(prefix)) {
          path = path.slice(prefix.length);
        }
      });
      if (type === 'image') {
        return `https://raw.githubusercontent.com/${this.owner}/${project.github.name}/${project.github.default_branch}/${path}`;
      } else {
        return `${project.github.html_url}/tree/${project.github.default_branch}/${path}`;
      }
    };
    return <Markdown content={content} urlTransformer={urlTransformer} />;
  }
}
