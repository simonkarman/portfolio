import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/card';
import { getAllProjects } from '@/utils/projects';
import { Explore } from '@/components/explore';

export default function Home() {
  return (<>
    <div className="mx-auto container flex flex-wrap justify-between">
      {getAllProjects().slice(0, 5).map(project => {
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
    <div className="mx-auto container px-5 space-y-4">
      <h2 className="border-b font-bold text-2xl mt-8 mb-1 text-center">
        Explore
      </h2>
      <Explore />
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
          <p className='hidden lg:block text-justify'>
            I believe that doing this effectively requires a modern way of working, in which development culture is the key.
            A big part of a great development culture is sharing knowledge.
            On this website you can find a portfolio of projects that I worked on, more information about me, and get in contact with me.
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
