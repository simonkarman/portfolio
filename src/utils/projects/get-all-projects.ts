'use server';

import { Project } from './project';
import { getProviders } from './providers';

export async function getAllProjects(): Promise<Project[]> {
  const providers = await getProviders();
  const projectsByProvider = await Promise.all(Object.values(providers).map(provider => provider.getProjects()));
  const projects = projectsByProvider.flatMap(p => p).sort((a, b) => b.date.localeCompare(a.date));

  // Validate that no two projects have the same slug
  const projectsBySlug = projects.reduce((acc, project) => {
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

  return projects;
}
