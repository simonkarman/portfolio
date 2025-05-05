import { use } from 'react';
import { PageProps } from '@/utils/page-props';
import { getAllProjects } from '@/utils/projects';
import Custom404 from '@/app/not-found';
import Image from 'next/image';
import Link from 'next/link';

export default function Project(props: PageProps<{ name: string }>) {
  const params = use(props.params);
  const project = getAllProjects().find((p => p.name === params.name));
  if (!project) {
    return <Custom404 />;
  }
  return <div className='bg-darkblue-400'>
    <div className='relative w-full'>
      <div className='container mx-auto px-5 text-white text-center z-[2] relative py-16 sm:py-24 md:py-32'>
        <h1 className='inline-block font-bold border-b pb-3 mb-3 text-3xl sm:text-5xl'>{project.title}</h1>
        <p className='text-lg sm:text-xl'>{project.description}</p>
        <div className='flex flex-wrap items-center justify-center gap-3 mt-4'>
          {project.tags.map(tag => <Link key={tag} href={`/projects?q=tag:${tag}`}
            className={`text-sm sm:text-base px-3 inline-block border border-gray-200 hover:border-gray-400 text-darkblue-500 rounded-3xl
                     bg-gradient-to-br from-white via-gray-50 to-gray-100 hover:via-gray-50 hover:to-gray-300`}>
            {tag}
          </Link>)}
        </div>
      </div>
      <div className='relative container mx-auto z-[3] px-5 pb-4 flex flex-col sm:flex-row items-center flex-wrap justify-between gap-1 text-white'>
        <p>Created by <strong className='font-bold'>{project.contributors}</strong></p>
        <p>Published on <strong className='font-bold'>{project.date.toFormat('yyyy-MM-dd')}</strong></p>
      </div>
      <Image
        src={project.image} alt={project.description}
        fill={true} objectFit='cover'
        className='z-[1] blur-sm opacity-50'
      />
    </div>
    <div className='bg-white'>
      <div className='container mx-auto p-5'>
        <p>{project.content}</p>
        <p>{project.repository}</p>
        <p>{project.documentation}</p>
        <p>{project.download}</p>
        <p>{project.demo}</p>
      </div>
    </div>
  </div>;
}
