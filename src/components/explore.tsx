'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { shuffle } from '@/utils/shuffle';

const getTagClassesBy = (count: number): string => {
  if (count >= 5) {
    return 'text-xl md:text-2xl px-5 font-bold';
  } else if (count >= 3) {
    return 'text-lg px-4 lg:font-bold';
  } else if (count >= 2) {
    return 'text-sm px-3';
  } else {
    return 'hidden text-xs px-3';
  }
};

export function Explore(props: { tags: [string, number][] }) {
  const { tags } = props;
  const bouncingTags = tags.filter(([, count]) => count >= 3).map(([tag]) => tag);
  const indices = shuffle(Array.from({ length: bouncingTags.length }, (_, i) => i));
  const delay = 0.3;
  const duration = 1.3;

  const getDelay = (tag: string): number => {
    const bouncingIndex = bouncingTags.indexOf(tag);
    if (bouncingIndex === -1) {
      return 99999;
    }
    return indices[bouncingIndex] * (duration + delay);
  };

  return <div className="flex flex-wrap items-center justify-center lg:gap-2 gap-1.5 px-4">
    {tags.map(([tag, count], index) => <Link
      key={tag}
      href={`/projects?q=tag:${tag}`}
    >
      <motion.div
        animate={{ rotate: [0, index % 2 === 0 ? 3 : -3, 0], scale: [1, 1.5, 1], background: ['#f9fafb', '#f3f4f6', '#f9fafb'] }}
        transition={{ repeatDelay: (bouncingTags.length - 1) * (duration + delay), delay: getDelay(tag), duration: duration, repeat: Infinity }}
        className={`${getTagClassesBy(count)} block py-2 lg:py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border-b`}
      >
        {tag}
      </motion.div>
    </Link>)}
  </div>;
}
