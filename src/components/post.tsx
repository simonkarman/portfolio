import Link from 'next/link';
import { PropsWithChildren } from 'react';

export function Post(props: PropsWithChildren<{
  title?: string,
  date?: string,
  image?: { src: string, alt: string },
  link?: { to: string, text?: string },
}>) {
  const { title, date, image, link, children } = props;
  return (<div className="w-full">
    <div className="h-full px-6 py-4 overflow-hidden rounded-lg">
      {(title || date) && <div className="flex justify-between mb-4 items-center border-b">
        {title && <h2 className="font-bold text-xl">
          { title }
        </h2>}
        {date && <div className="text-right text-sm mb-2 text-gray-400">
          { date }
        </div>}
      </div>}
      <div className='md:flex'>
        {image && <img src={image.src} alt={image.alt} className="w-24 h-24 md:w-40 md:h-40 float-left ml-2 mr-5 mt-1 mb-2 rounded-lg" />}
        <p className="flex-grow text-gray-800 text-base text-justify mb-4">
          {children}
        </p>
      </div>
      {link && <p>
        <Link
          href={link.to} className="float-right px-3 py-1 rounded bg-darkblue-300 hover:bg-darkblue-200 text-white">
          { link.text || 'Read more...' }
        </Link>
      </p>}
    </div>
  </div>)
  ;
}
