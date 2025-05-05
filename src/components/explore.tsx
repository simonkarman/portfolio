import { getAllTags } from '@/utils/projects';

export const Explore = () => {
  const tagClassesForCount = (count: number): string => {
    if (count >= 5) {
      return 'text-2xl md:text-3xl px-5';
    } else if (count >= 3) {
      return 'text-xl px-4';
    } else if (count >= 2) {
      return 'text-md px-3';
    } else {
      return 'hidden md:block text-sm px-3';
    }
  };

  return <div className="flex flex-wrap items-center justify-center gap-2">
    {getAllTags().map(([tag, count]) => <a
      key={tag}
      href={`/projects?q=tag:${tag}`}
    >
      <div className={`${tagClassesForCount(count)} py-2 tracking-tighter hover:text-white bg-gray-100 hover:bg-darkblue-600 rounded-3xl`}>
        {tag}
      </div>
    </a>)}
  </div>;
};
