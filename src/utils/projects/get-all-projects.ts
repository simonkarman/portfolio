'use server';

import { Project } from './project';
import { getProviders } from './providers';

export async function getAllProjects(): Promise<Project[]> {
  const providers = await getProviders();
  const projects = await Promise.all(Object.values(providers).map(provider => provider.getProjects()));
  return projects.flatMap(p => p).sort((a, b) => b.date.localeCompare(a.date));
}
