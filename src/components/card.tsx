import React, { PropsWithChildren, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DateTime } from 'luxon';

type CardProps = {
  title: string,
  image: { src: string, alt: string },
  link: { to: string, text?: string },
  date?: DateTime,
  tags?: string[],
  overrideBackgroundClassName?: string,
}

export const Card = (props: PropsWithChildren<CardProps>) => {
  const { children, title, image, link, date } = props;
  const bg = props.overrideBackgroundClassName ? props.overrideBackgroundClassName : 'bg-gray-50';
  const tags = useMemo(() => {
    const _tags = props.tags ?? [];
    return _tags.filter(tag => tag !== undefined);
  }, [props.tags]);

  return (
    <div className="w-full lg:w-1/2 p-2">
      <Link href={link.to}>
        <div className={`h-full overflow-hidden border hover:border-black rounded-lg ${bg}`}>
          <div className="relative w-full pb-1/4 sm:pb-1/5 bg-darkblue-400">
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              className="absolute w-full h-full mb-4 object-cover opacity-75"
            />
          </div>
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-xl mb-2">
                {title}
              </h2>
              {date && <div className="text-right text-sm mb-2 text-gray-500">
                {date.toFormat('yyyy-MM-dd')}
              </div>}
            </div>
            <div className="text-gray-800 text-left md:text-justify lg:text-left xl:text-justify">
              <div className="mb-4">
                {children}
              </div>
              <p className="mb-2">
                {link.text && <Link href={link.to} className="text-red-600 underline hover:text-red-800">
                  {link.text}
                </Link>}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-end mx-6 mb-4">
            {tags.map((tag) => (
              <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};
