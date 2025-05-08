import { getAllTags } from '@/utils/projects/get-all-tags';
import Link from 'next/link';

const getTagClassesBy = (count: number): string => {
  if (count >= 5) {
    return 'text-xl md:text-2xl px-5 font-bold';
  } else if (count >= 3) {
    return 'text-lg px-4 font-bold';
  } else if (count >= 2) {
    return 'text-sm px-3';
  } else {
    return 'hidden md:block text-xs px-3';
  }
};

export async function Explore() {
  const tags = await getAllTags();

  return <div className="flex flex-wrap items-center justify-center gap-2 px-4">
    {tags.map(([tag, count]) => <Link
      key={tag}
      href={`/projects?q=tag:${tag}`}
    >
      <div
        className={`${getTagClassesBy(count)} py-2 border rounded border-gray-200 hover:border-gray-400 text-darkblue-500
                   bg-gray-50 hover:bg-gray-100`}
      >
        {tag}
      </div>
    </Link>)}
  </div>;
}
