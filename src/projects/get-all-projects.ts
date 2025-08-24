/* eslint-disable no-process-env */
'use server';

import { ProjectWithProviderName } from './project';
import { getProviders, ProviderName } from './providers';
import { CacheConfiguration, staleWhileRevalidate } from '@/utils/stale-while-revalidate';
import { InMemoryFile } from '@/utils/file-system/in-memory-file';
import { LocalFile } from '@/utils/file-system/local-file';
import path from 'node:path';
import { S3File } from '@/utils/file-system/s3-file';

const isProduction = process.env.NODE_ENV === 'production';

// Configure the cache settings
const localFile = new LocalFile(path.join(process.cwd(), '.cache/projects.json'));
const externalFile = process.env.SIMONKARMAN_AWS_ACCESS_KEY_ID
  ? new S3File('simonkarman.nl', 'projects.json')
  : new InMemoryFile(localFile.readSync());

const oneSecond = 1000;
const cacheConfiguration: CacheConfiguration = {
  staleTimeMs: (isProduction ? 300 : 10) * oneSecond,
  file: isProduction ? externalFile : localFile,
};

// Define the function to get all projects with caching
export const getAllProjects = staleWhileRevalidate(
  cacheConfiguration,
  async (): Promise<ProjectWithProviderName[]> => {
    const providers = await getProviders();
    const projectsByProvider = await Promise.all(Object.entries(providers)
      .map(async ([ providerName, provider ]) => ({
        providerName: providerName as ProviderName,
        projects: await provider.getProjects(),
      })),
    );
    const projectsWithProviderName: ProjectWithProviderName[] = projectsByProvider
      .flatMap(p => p.projects.map(project => ({ ...project, providerName: p.providerName })))
      .sort((a, b) => b.date.localeCompare(a.date));

    // Validate that no two projects have the same slug
    const projectsBySlug = projectsWithProviderName.reduce((acc, project) => {
      if (!acc[project.slug]) {
        acc[project.slug] = [project.providerName];
      } else {
        acc[project.slug].push(project.providerName);
      }
      return acc;
    }, {} as Record<string, string[]>);
    const duplicateSlugs = Object.entries(projectsBySlug).filter(([_, providers]) => providers.length > 1);
    if (duplicateSlugs.length > 0) {
      console.error('Duplicate slugs', duplicateSlugs);
      throw new Error(`${duplicateSlugs.length} duplicate slug(s) found`);
    }

    return projectsWithProviderName;
  },
);
