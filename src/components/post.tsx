import Link from 'next/link';
import { PropsWithChildren } from 'react';

export function Post(props: PropsWithChildren<{
  title?: string,
  date?: string,
  image?: { src: string, alt: string },
  link?: { to: string, text?: string },
}>) {
  const { title, date, image, link, children } = props;
  return (<div className="w-full p-2">
    <div className="h-full clearfix px-6 py-4 overflow-hidden rounded-lg shadow-md bg-white">
      {(title || date) && <div className="flex justify-between mb-4 items-center border-b">
        {title && <h2 className="font-bold text-xl">
          { title }
        </h2>}
        {date && <div className="text-right text-sm mb-2 text-gray-400">
          { date }
        </div>}
      </div>}
      {image && <img src={image.src} alt={image.alt} className="w-24 md:w-1/6 float-left ml-2 mr-5 mt-1 mb-2 rounded-lg" />}
      <p className="text-gray-800 text-base text-justify mb-4">
        {children}
      </p>
      {link && <p>
        <Link
          href={link.to} className="float-right px-6 py-3 bg-darkblue-300 hover:bg-darkblue-200 text-white">
          { link.text || 'Read more...' }
        </Link>
      </p>}
    </div>
  </div>)
  ;
}
