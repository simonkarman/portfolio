import React, { PropsWithChildren, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type CardProps = {
  title: string,
  image: { src: string, alt: string },
  link?: { to: string, text?: string },
  date?: string,
  tags?: string[],
  overrideBackgroundClassName?: string,
  fullscreen?: boolean,
}

export const Card = (props: PropsWithChildren<CardProps>) => {
  const { children, title, image, link, date } = props;
  const bg = props.overrideBackgroundClassName ? props.overrideBackgroundClassName : 'bg-gray-50';
  const tags = useMemo(() => {
    const _tags = props.tags ?? [];
    return _tags.filter((tag, index) => tag !== undefined && _tags.indexOf(tag) === index);
  }, [props.tags]);

  return (
    <div className={`w-full ${props.fullscreen ? 'md:w-1/2 md:p-2 xl:w-1/3 2xl:w-1/4' : 'lg:w-1/2 lg:p-2'} p-0`}>
      <Link href={link?.to ?? '#'}>
        <div className={`h-full overflow-hidden border hover:border-darkblue-400 rounded-lg ${bg}`}>
          <div className="relative w-full h-20 sm:h-32 bg-darkblue-400">
            <Image
              src={image.src}
              alt={image.alt}
              fill={true}
              className="mb-4 opacity-75 object-cover"
            />
          </div>
          <div className="px-6 pt-4 border-t border-darkblue-300">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-2xl mb-2">
                {title}
              </h2>
              {date && <div className="shrink-0 text-right text-sm mb-2 text-gray-500">
                {date}
              </div>}
            </div>
            <div className="text-gray-800 text-left md:text-justify lg:text-left xl:text-justify">
              <div className="mb-4">
                {children}
              </div>
              <p className="mb-2">
                {link?.text && <span className="text-red-600 underline hover:text-red-800">
                  {link.text}
                </span>}
              </p>
            </div>
          </div>
          <div className="hidden sm:flex flex-wrap justify-end mx-6 mb-2">
            {tags.map((tag) => (
              <span key={tag} className="inline-block rounded px-3 py-1 text-sm font-semibold mr-2 mb-2
                   border border-gray-200 text-darkblue-500 bg-gray-50">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};
