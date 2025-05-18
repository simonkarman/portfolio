'use server';

import { ProjectWithProviderName } from './project';
import { getProviders, ProviderName } from './providers';

export async function getAllProjects(): Promise<ProjectWithProviderName[]> {
  'use cache';
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
}
