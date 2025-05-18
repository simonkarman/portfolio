'use server';

import { getAllProjects } from './get-all-projects';

function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function getAllTags(): Promise<[string, number][]> {
  const projects = await getAllProjects();
  const tags = projects.flatMap(p => p.tags);
  const tagCounts = Object.entries(tags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>));
  return shuffle(tagCounts);
}
