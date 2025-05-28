'use server';

import Custom404 from '@/app/not-found';
import Link from 'next/link';
import Image from 'next/image';
import { getProject } from '@/projects/get-project';
import { getProviders } from '@/projects/providers';
import { Metadata } from 'next';
import { Buttons } from '@/app/projects/[slug]/buttons';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const slug = (await params).slug;
  const project = await getProject(slug);
  if (project === null) {
    return {};
  }
  return {
    title: `${project.title} - Simon Karman`,
    description: project.description,
  };
}

export default async function Project(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = await getProject(params.slug);
  if (project === null) {
    return <Custom404 />;
  }

  const providers = await getProviders();
  const render = await providers[project.providerName].render(project);
  return <div>
    <div className='bg-darkblue-400'>
      <div className='relative w-full'>
        <div className='max-w-[75ch] mx-auto px-5 text-white text-center z-[2] relative py-16 sm:py-24 md:py-32'>
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
        <div className='relative max-w-[75ch] mx-auto z-[3] px-5 pb-4 flex flex-col sm:flex-row items-center
                      flex-wrap justify-between gap-1 text-white'>
          <p>Created by <strong className='font-bold'>{project.contributors}</strong></p>
          <p>Published on <strong className='font-bold'>{project.date}</strong></p>
        </div>
        <Image
          src={project.image} alt={project.description}
          fill={true}
          className='z-[1] blur-sm opacity-40 object-cover'
        />
      </div>
    </div>
    <div className='mx-auto max-w-[75ch]'>
      <div className='empty:hidden pt-8 px-5 flex flex-wrap justify-center md:justify-end gap-2'>
        <Buttons
          slug={project.slug}
          title={project.title}
          forceShowShare={false}
          demo={project.demo}
          documentation={project.documentation}
          download={project.download}
          repository={project.repository}
        />
      </div>
    </div>
    <div className='px-5 py-10 overflow-x-hidden'>
      {render}
      <div className='max-w-[75ch] mx-auto'>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col gap-4 items-center sm:flex-row sm:justify-between">
            <div className="flex flex-wrap gap-2 text-sm text-gray-500">
              <span>By {project.contributors}</span>
              <span>|</span>
              <span>{project.date}</span>
            </div>
            <div className="shrink-0 flex flex-wrap gap-2">
              <Buttons
                slug={project.slug}
                title={project.title}
                forceShowShare={true}
                demo={project.demo}
                documentation={project.documentation}
                download={project.download}
                repository={project.repository}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
