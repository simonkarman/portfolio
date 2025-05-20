'use server';

import { getAllProjects } from './get-all-projects';
import { shuffle } from '@/utils/shuffle';

export async function getAllTags(): Promise<[string, number][]> {
  const projects = await getAllProjects();
  const tags = projects.flatMap(p => p.tags);
  const tagCounts = Object.entries(tags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>));
  return shuffle(tagCounts);
}
