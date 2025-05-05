import Link from 'next/link';
import Image from 'next/image';

function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ array[i], array[j] ] = [ array[j], array[i] ];
  }
  return array;
}

const tags: [string, number][] = shuffle([
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
const sizeFor = (count: number): string => {
  if (count >= 5) {
    return 'text-2xl md:text-3xl';
  } else if (count >= 3) {
    return 'text-xl';
  } else if (count >= 2) {
    return 'text-md';
  } else {
    return 'hidden md:inline text-sm';
  }
};

export default function Home() {
  return (<>
    <div className="container mx-auto w-full">
      <div className="my-2 flex gap-4 justify-center items-center flex-wrap p-5">
        <div className="aspect-video md:aspect-square w-full max-w-[22rem] bg-gray-100 p-2">
          <h1 className="font-bold text-3xl border-b mb-4">
          Latest
          </h1>
        </div>
        <div className="aspect-video md:aspect-square w-full max-w-[22rem] bg-gray-100 p-2">
          <h1 className="font-bold text-3xl border-b mb-4">
          Highlight
          </h1>
        </div>
      </div>
    </div>
    <div className="mx-auto container px-5">
      <h2 className="border-b font-bold text-2xl mt-8 mb-1 text-center">
        Explore
      </h2>
    </div>
    <div className="container mx-auto flex flex-wrap items-center justify-center gap-2 p-5">
      {tags.map(([tag, count]) => <div
        key={tag}
        className={`${sizeFor(count)} px-3 py-1 tracking-tighter hover:text-white bg-gray-100 hover:bg-darkblue-600 rounded-3xl`}
      >
        {tag.substring(0, 1).toUpperCase() + tag.slice(1)}
      </div>)}
    </div>
    <div className="container mx-auto w-full my-2 p-5">
      <h1 className="font-bold text-2xl text-center border-b mb-4">
        About Me
      </h1>
      <div className='flex flex-col sm:flex-row'>
        <Image
          src="/simonkarman.png"
          alt="Simon Karman"
          width={160}
          height={160}
          className="w-40 h-40 mx-auto sm:ml-2 sm:mr-5 mt-1 mb-2 rounded-xl"
        />
        <div className="flex flex-col p-2 overflow-hidden rounded-lg space-y-3">
          <p className='text-justify'>
            My name is <b>Simon Karman</b>. I am a Cloud Consultant at Xebia Cloud and a hobbyist Game Developer.
            I love to architect and develop systems such as cloud infrastructures, (board) games, and web applications.
          </p>
          <Link
            href={'/about'}
            className="px-3 py-1 rounded bg-darkblue-300 hover:bg-darkblue-200 text-white">
            More information
          </Link>
        </div>
      </div>
    </div>
  </>);
}
