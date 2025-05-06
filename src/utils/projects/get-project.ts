'use server';

import { Project } from './project';
import { getAllProjects } from './get-all-projects';

export async function getProject(name: string): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find(project => project.name === name) || null;
}
