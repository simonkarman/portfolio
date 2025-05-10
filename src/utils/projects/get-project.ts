'use server';

import { ProjectWithProviderName } from './project';
import { getAllProjects } from './get-all-projects';

export async function getProject(slug: string): Promise<ProjectWithProviderName | null> {
  const projects = await getAllProjects();
  return projects.find(project => project.slug === slug) || null;
}
