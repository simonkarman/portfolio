import { shuffle } from '@/utils/shuffle';
import { DateTime } from 'luxon';

type Project = {
  name: string,
  title: string,
  date: DateTime,
  contributors: string,
  description: string,
  tags: string[],
  image: string,
  content: string,
  repository: string,
}

// TODO: get projects from file system
// TODO: return them ordered by date
export const getAllProjects = (): Project[] => [
  {
    'name': 'advent-of-code-2023a',
    'title': 'Advent of Code 2023',
    'date': DateTime.fromISO('2023-12-01'),
    'contributors': 'Simon Karman',
    'description': 'Solutions to Advent of Code 2023 written in Rust.',
    'tags': [
      'advent-of-code',
      'rust',
    ],
    'image': 'https://images.ctfassets.net/r26fkm24j6bh/6HyMzsG8xJqCasVDez9nxB/31b49bb3b9f9d2bfef853f16bba75c27/game-dark.png',
    // eslint-disable-next-line max-len
    'content': '[Advent of Code](https://adventofcode.com/2023/leaderboard/private/view/718869) is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like.\n\nFor the 2023 edition of Advent of Code I solved all the puzzles using [Rust](https://www.rust-lang.org/).\n',
    'repository': 'https://github.com/simonkarman/advent-of-code-2023',
  },
  {
    'name': 'advent-of-code-2023b',
    'title': 'Advent of Code 2023',
    'date': DateTime.fromISO('2023-12-01'),
    'contributors': 'Simon Karman',
    'description': 'Solutions to Advent of Code 2023 written in Rust.',
    'tags': [
      'advent-of-code',
      'rust',
    ],
    'image': 'https://images.ctfassets.net/r26fkm24j6bh/6HyMzsG8xJqCasVDez9nxB/31b49bb3b9f9d2bfef853f16bba75c27/game-dark.png',
    // eslint-disable-next-line max-len
    'content': '[Advent of Code](https://adventofcode.com/2023/leaderboard/private/view/718869) is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like.\n\nFor the 2023 edition of Advent of Code I solved all the puzzles using [Rust](https://www.rust-lang.org/).\n',
    'repository': 'https://github.com/simonkarman/advent-of-code-2023',
  },
  {
    'name': 'advent-of-code-2023c',
    'title': 'Advent of Code 2023',
    'date': DateTime.fromISO('2023-12-01'),
    'contributors': 'Simon Karman',
    'description': 'Solutions to Advent of Code 2023 written in Rust.',
    'tags': [
      'advent-of-code',
      'rust',
    ],
    'image': 'https://images.ctfassets.net/r26fkm24j6bh/6HyMzsG8xJqCasVDez9nxB/31b49bb3b9f9d2bfef853f16bba75c27/game-dark.png',
    // eslint-disable-next-line max-len
    'content': '[Advent of Code](https://adventofcode.com/2023/leaderboard/private/view/718869) is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like.\n\nFor the 2023 edition of Advent of Code I solved all the puzzles using [Rust](https://www.rust-lang.org/).\n',
    'repository': 'https://github.com/simonkarman/advent-of-code-2023',
  },
  {
    'name': 'advent-of-code-2023d',
    'title': 'Advent of Code 2023',
    'date': DateTime.fromISO('2023-12-01'),
    'contributors': 'Simon Karman',
    'description': 'Solutions to Advent of Code 2023 written in Rust.',
    'tags': [
      'advent-of-code',
      'rust',
    ],
    'image': 'https://images.ctfassets.net/r26fkm24j6bh/6HyMzsG8xJqCasVDez9nxB/31b49bb3b9f9d2bfef853f16bba75c27/game-dark.png',
    // eslint-disable-next-line max-len
    'content': '[Advent of Code](https://adventofcode.com/2023/leaderboard/private/view/718869) is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like.\n\nFor the 2023 edition of Advent of Code I solved all the puzzles using [Rust](https://www.rust-lang.org/).\n',
    'repository': 'https://github.com/simonkarman/advent-of-code-2023',
  },
  {
    'name': 'advent-of-code-2023e',
    'title': 'Advent of Code 2023',
    'date': DateTime.fromISO('2023-12-01'),
    'contributors': 'Simon Karman',
    'description': 'Solutions to Advent of Code 2023 written in Rust.',
    'tags': [
      'advent-of-code',
      'rust',
    ],
    'image': 'https://images.ctfassets.net/r26fkm24j6bh/6HyMzsG8xJqCasVDez9nxB/31b49bb3b9f9d2bfef853f16bba75c27/game-dark.png',
    // eslint-disable-next-line max-len
    'content': '[Advent of Code](https://adventofcode.com/2023/leaderboard/private/view/718869) is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like.\n\nFor the 2023 edition of Advent of Code I solved all the puzzles using [Rust](https://www.rust-lang.org/).\n',
    'repository': 'https://github.com/simonkarman/advent-of-code-2023',
  },
  {
    'name': 'advent-of-code-2023f',
    'title': 'Advent of Code 2023',
    'date': DateTime.fromISO('2023-12-01'),
    'contributors': 'Simon Karman',
    'description': 'Solutions to Advent of Code 2023 written in Rust.',
    'tags': [
      'advent-of-code',
      'rust',
    ],
    'image': 'https://images.ctfassets.net/r26fkm24j6bh/6HyMzsG8xJqCasVDez9nxB/31b49bb3b9f9d2bfef853f16bba75c27/game-dark.png',
    // eslint-disable-next-line max-len
    'content': '[Advent of Code](https://adventofcode.com/2023/leaderboard/private/view/718869) is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like.\n\nFor the 2023 edition of Advent of Code I solved all the puzzles using [Rust](https://www.rust-lang.org/).\n',
    'repository': 'https://github.com/simonkarman/advent-of-code-2023',
  },
  {
    'name': 'advent-of-code-2023g',
    'title': 'Advent of Code 2023',
    'date': DateTime.fromISO('2017-12-01'),
    'contributors': 'Simon Karman',
    'description': 'Solutions to Advent of Code 2023 written in Rust.',
    'tags': [
      'advent-of-code',
      'rust',
    ],
    'image': 'https://images.ctfassets.net/r26fkm24j6bh/6HyMzsG8xJqCasVDez9nxB/31b49bb3b9f9d2bfef853f16bba75c27/game-dark.png',
    // eslint-disable-next-line max-len
    'content': '[Advent of Code](https://adventofcode.com/2023/leaderboard/private/view/718869) is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like.\n\nFor the 2023 edition of Advent of Code I solved all the puzzles using [Rust](https://www.rust-lang.org/).\n',
    'repository': 'https://github.com/simonkarman/advent-of-code-2023',
  },
  {
    'name': 'advent-of-code-2023h',
    'title': 'Advent of Code 2023',
    'date': DateTime.fromISO('2019-12-01'),
    'contributors': 'Simon Karman',
    'description': 'Solutions to Advent of Code 2023 written in Rust.',
    'tags': [
      'advent-of-code',
      'rust',
    ],
    'image': 'https://images.ctfassets.net/r26fkm24j6bh/6HyMzsG8xJqCasVDez9nxB/31b49bb3b9f9d2bfef853f16bba75c27/game-dark.png',
    // eslint-disable-next-line max-len
    'content': '[Advent of Code](https://adventofcode.com/2023/leaderboard/private/view/718869) is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like.\n\nFor the 2023 edition of Advent of Code I solved all the puzzles using [Rust](https://www.rust-lang.org/).\n',
    'repository': 'https://github.com/simonkarman/advent-of-code-2023',
  },
  {
    'name': 'advent-of-code-2023i',
    'title': 'Advent of Code 2023',
    'date': DateTime.fromISO('2021-12-01'),
    'contributors': 'Simon Karman',
    'description': 'Solutions to Advent of Code 2023 written in Rust.',
    'tags': [
      'advent-of-code',
      'rust',
    ],
    'image': 'https://images.ctfassets.net/r26fkm24j6bh/6HyMzsG8xJqCasVDez9nxB/31b49bb3b9f9d2bfef853f16bba75c27/game-dark.png',
    // eslint-disable-next-line max-len
    'content': '[Advent of Code](https://adventofcode.com/2023/leaderboard/private/view/718869) is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like.\n\nFor the 2023 edition of Advent of Code I solved all the puzzles using [Rust](https://www.rust-lang.org/).\n',
    'repository': 'https://github.com/simonkarman/advent-of-code-2023',
  },
  {
    'name': 'advent-of-code-2023k',
    'title': 'Advent of Code 2023',
    'date': DateTime.fromISO('2024-12-01'),
    'contributors': 'Simon Karman',
    'description': 'Solutions to Advent of Code 2023 written in Rust.',
    'tags': [
      'advent-of-code',
      'rust',
    ],
    'image': 'https://images.ctfassets.net/r26fkm24j6bh/6HyMzsG8xJqCasVDez9nxB/31b49bb3b9f9d2bfef853f16bba75c27/game-dark.png',
    // eslint-disable-next-line max-len
    'content': '[Advent of Code](https://adventofcode.com/2023/leaderboard/private/view/718869) is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like.\n\nFor the 2023 edition of Advent of Code I solved all the puzzles using [Rust](https://www.rust-lang.org/).\n',
    'repository': 'https://github.com/simonkarman/advent-of-code-2023',
  },
];

// TODO: get tags from projects
export const getAllTags = (): [string, number][] => shuffle([
  [ 'typescript', 9 ], [ 'game', 7 ],
  [ 'websockets', 5 ], [ 'react', 5 ],
  [ 'krmx', 4 ], [ 'aws', 4 ],
  [ 'vue', 3 ], [ 'javascript', 3 ],
  [ 'networking', 3 ], [ 'unity', 3 ],
  [ 'c#', 3 ], [ 'metrics', 2 ],
  [ 'blog', 2 ], [ 'express', 2 ],
  [ 'trackmania', 2 ], [ 'mapmaking', 2 ],
  [ 'contentful', 2 ], [ 'tailwindcss', 2 ],
  [ 'serverless', 2 ], [ 'cloudformation', 2 ],
  [ 'advent-of-code', 1 ], [ 'rust', 1 ],
  [ 'riddle', 1 ], [ 'graphviz', 1 ],
  [ 'cycling', 1 ], [ 'msk', 1 ],
  [ 'gcp', 1 ], [ 'terraform', 1 ],
  [ 'slack', 1 ], [ 'docker', 1 ],
  [ 'next', 1 ], [ 'svg', 1 ],
  [ 'iac', 1 ], [ 'nextjs', 1 ],
  [ 'netlify', 1 ], [ 'nuxtjs', 1 ],
  [ 'certificates', 1 ], [ 'https', 1 ],
  [ 'security', 1 ], [ 'tikkie', 1 ],
  [ 'mongodb', 1 ],
]);
