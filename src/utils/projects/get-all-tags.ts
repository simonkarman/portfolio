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

  // Example shuffle with many tags for testing purposes!
  // return shuffle([
  //   [ 'typescript', 9 ], [ 'game', 7 ],
  //   [ 'websockets', 5 ], [ 'react', 5 ],
  //   [ 'krmx', 4 ], [ 'aws', 4 ],
  //   [ 'vue', 3 ], [ 'javascript', 3 ],
  //   [ 'networking', 3 ], [ 'unity', 3 ],
  //   [ 'c#', 3 ], [ 'metrics', 2 ],
  //   [ 'blog', 2 ], [ 'express', 2 ],
  //   [ 'trackmania', 2 ], [ 'mapmaking', 2 ],
  //   [ 'contentful', 2 ], [ 'tailwindcss', 2 ],
  //   [ 'serverless', 2 ], [ 'cloudformation', 2 ],
  //   [ 'advent-of-code', 1 ], [ 'rust', 1 ],
  //   [ 'riddle', 1 ], [ 'graphviz', 1 ],
  //   [ 'cycling', 1 ], [ 'msk', 1 ],
  //   [ 'gcp', 1 ], [ 'terraform', 1 ],
  //   [ 'slack', 1 ], [ 'docker', 1 ],
  //   [ 'next', 1 ], [ 'svg', 1 ],
  //   [ 'iac', 1 ], [ 'nextjs', 1 ],
  //   [ 'netlify', 1 ], [ 'nuxtjs', 1 ],
  //   [ 'certificates', 1 ], [ 'https', 1 ],
  //   [ 'security', 1 ], [ 'tikkie', 1 ],
  //   [ 'mongodb', 1 ],
  // ]);
}
