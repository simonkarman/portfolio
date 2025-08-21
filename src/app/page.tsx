import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/card';
import { getAllProjects } from '@/projects/get-all-projects';
import { Explore } from '@/components/explore';
import { getAllTags } from '@/projects/get-all-tags';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const projects = await getAllProjects();
  const tags = await getAllTags();

  return (<>
    <div className="container mx-auto p-5 mt-4 space-y-8">
      <div className='flex flex-col sm:flex-row items-center gap-2'>
        <Image
          src="/simonkarman.png"
          alt="Simon Karman"
          width={160}
          height={160}
          className="w-40 h-40 mx-auto sm:ml-2 sm:mr-5 mt-1 mb-2 rounded-xl"
        />
        <div className="flex flex-col items-center sm:items-start px-2 overflow-hidden rounded-lg space-y-5">
          <p className='text-justify'>
            Hi! My name is <b>Simon Karman</b>. I work as a Cloud Consultant at Xebia and I&#39;m a hobbyist Game Developer.
            I love architecting and developing cloud infrastructures, (board) games, and web applications.
            <span className='hidden lg:inline text-justify'>
              {' '}On this website you can find a portfolio of projects that I worked on, more information about me, and get in contact with me.
            </span>
          </p>
          <Link
            href={'/projects'}
            className="inline-block px-3 py-1 rounded bg-darkblue-300 hover:bg-darkblue-200 text-white">
            Check out my portfolio!
          </Link>
        </div>
      </div>
      <div className='py-10 hidden lg:block'>
        <Explore tags={tags} />
      </div>
      <div className="flex flex-wrap justify-between gap-8 lg:gap-0">
        {projects.slice(0, 3).map(project => {
          return (
            <Card
              key={project.slug}
              title={project.title}
              date={project.date}
              image={{ src: project.image, alt: 'Project Image' }}
              link={{ to: `/projects/${project.slug}` }}
              tags={project.tags}
            >
              <p>{project.description}</p>
            </Card>
          );
        })}
        <Card
          image={{ src: '/card.jpg', alt: 'Mountains' }}
          link={{ to: '/projects/', text: 'Show all projects' }}
          title="Overview of all projects"
          overrideBackgroundClassName="bg-purple-50"
        >
          <p>An overview of all the projects I worked on.</p>
        </Card>
      </div>
    </div>
  </>);
}
