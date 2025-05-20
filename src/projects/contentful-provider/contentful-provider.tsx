/* eslint-disable no-process-env */
import { ReactElement } from 'react';
import { ContentfulClientApi, createClient } from 'contentful';
import { Markdown } from '@/projects/markdown';
import { Provider } from '../provider';
import { ProjectSchema, ProjectWithoutProviderName } from '../project';

/**
 * ContentfulProvider gets the contentful project items and renders their content as markdown.
 */
export class ContentfulProvider implements Provider {
  private readonly client: ContentfulClientApi<undefined>;

  constructor() {
    const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN ?? '';
    const spaceId = process.env.CONTENTFUL_SPACE_ID ?? '';
    const environment = process.env.CONTENTFUL_ENVIRONMENT ?? 'master';
    this.client = createClient({ space: spaceId, accessToken, environment });
  }

  async getProjects(): Promise<ProjectWithoutProviderName[]> {
    const entries = await this.client.getEntries({ content_type: 'project', limit: 250 });
    const getUrlFrom = (asset: unknown) => {
      const asset1 = asset as { fields: { file: { url: string } } };
      if (asset1?.fields?.file?.url) {
        return `https:${asset1.fields.file.url}`;
      }
      return undefined;
    };
    return entries.items.map(item => {
      const fields = item.fields;
      return {
        slug: fields.name,
        title: fields.title,
        date: fields.date,
        contributors: fields.contributors,
        description: fields.description,
        tags: fields.tags,
        image: getUrlFrom(fields.image),
        repository: fields.repository,
        download: getUrlFrom(fields.download),
        documentation: getUrlFrom(fields.documentation),
        demo: fields.demo,
      };
    }).map(project => {
      const safeProject = ProjectSchema.safeParse(project);
      if (!safeProject.success) {
        console.error(`Contentful Provider found invalid project: ${project.slug}. Reason: ${safeProject.error}`);
      }
      return safeProject;
    })
      .filter(safeProject => safeProject.success)
      .map(safeProject => safeProject.data!);
  }

  async render(project: ProjectWithoutProviderName): Promise<ReactElement> {
    const content = await this.client.getEntries({
      content_type: 'project',
      'fields.name': project.slug,
    });
    return <Markdown content={content.items[0].fields.content as string} />;
  }
}
