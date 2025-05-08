'use server';

import Custom404 from '@/app/not-found';
import Link from 'next/link';
import Image from 'next/image';
import { getProject } from '@/utils/projects/get-project';
import { getProviders } from '@/utils/projects/providers';

export default async function Project(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = await getProject(params.slug);
  if (project === null) {
    return <Custom404 />;
  }

  const rendered = (await getProviders())[project.providerName].render(project);
  return <div className='bg-darkblue-400'>
    <div className='relative w-full'>
      <div className='container mx-auto px-5 text-white text-center z-[2] relative py-16 sm:py-24 md:py-32'>
        <h1 className='inline-block font-bold border-b pb-3 mb-3 text-3xl sm:text-5xl'>{project.title}</h1>
        <p className='text-lg sm:text-xl'>{project.description}</p>
        <div className='flex flex-wrap items-center justify-center gap-3 mt-4'>
          {project.tags.map(tag => <Link
            key={tag}
            href={`/projects?q=tag:${tag}`}
            className={`text-sm md:text-base px-2 py-0.5 inline-block border border-darkblue-300 hover:border-darkblue-100 rounded
                     bg-darkblue-600 hover:bg-darkblue-300 bg-opacity-40`}>
            {tag}
          </Link>)}
        </div>
      </div>
      <div className='relative container mx-auto z-[3] px-5 pb-4 flex flex-col sm:flex-row items-center flex-wrap justify-between gap-1 text-white'>
        <p>Created by <strong className='font-bold'>{project.contributors}</strong></p>
        <p>Published on <strong className='font-bold'>{project.date}</strong></p>
      </div>
      <Image
        src={project.image} alt={project.description}
        fill={true} objectFit='cover'
        className='z-[1] blur-sm opacity-40'
      />
    </div>
    <div className='bg-white px-5 py-10'>
      <div className='container mx-auto'>
        {rendered}
      </div>
    </div>
  </div>;
}

// {/*TODO: add a banner or footer or both later that displays some common information about projects*/}
// {/*<hr className='my-4' />*/}
// {/*{project.repository && <p className='text-sm text-gray-500'>Repository: {project.repository}</p>}*/}
// {/*{project.documentation && <p className='text-sm text-gray-500'>Documentation: {project.documentation}</p>}*/}
// {/*{project.download && <p className='text-sm text-gray-500'>Download: {project.download}</p>}*/}
// {/*{project.demo && <p className='text-sm text-gray-500'>Demo: {project.demo}</p>}*/}
