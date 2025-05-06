import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/card';
import { getAllProjects } from '@/utils/projects/get-all-projects';
import { Explore } from '@/components/explore';

export default async function Home() {
  const projects = await getAllProjects();
  return (<>
    <div className="container mx-auto p-5 mt-4 space-y-4">
      <div className='flex flex-col sm:flex-row items-start gap-2'>
        <Image
          src="/simonkarman.png"
          alt="Simon Karman"
          width={160}
          height={160}
          className="w-40 h-40 mx-auto sm:ml-2 sm:mr-5 mt-1 mb-2 rounded-xl"
        />
        <div className="flex flex-col items-center sm:items-start px-2 overflow-hidden rounded-lg space-y-5">
          <p className='text-justify'>
            My name is <b>Simon Karman</b>. I am a Cloud Consultant at Xebia and a hobbyist Game Developer.
            I love to architect and develop systems such as cloud infrastructures, (board) games, and web applications.
          </p>
          <p className='hidden xl:block text-justify'>
            I believe that doing this effectively requires a modern way of working, in which development culture is the key.
            A big part of a great development culture is sharing knowledge.
            On this website you can find a portfolio of projects that I worked on, more information about me, and get in contact with me.
          </p>
          <Link
            href={'/projects'}
            className="inline-block px-3 py-1 rounded bg-darkblue-300 hover:bg-darkblue-200 text-white">
            Check out my portfolio!
          </Link>
        </div>
      </div>
      <div className='space-y-5 py-4'>
        <h2 className="pb-1 border-b font-bold text-3xl text-center">
          Explore
        </h2>
        <Explore />
      </div>
      <h1 className="pt-4 pb-1 border-b font-bold text-3xl text-center">
        Latest Projects
      </h1>
      <div className="flex flex-wrap justify-between gap-4 lg:gap-0">
        {projects.slice(0, 3).map(project => {
          return (
            <Card
              key={project.name}
              title={project.title}
              date={project.date}
              image={{ src: project.image, alt: 'Project Image' }}
              link={{ to: `/projects/${project.name}` }}
              tags={[project.name, ...project.tags].slice(0, 4)}
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
