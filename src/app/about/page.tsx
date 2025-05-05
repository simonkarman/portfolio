import Image from 'next/image';
import { certificationsItems, educationItems, experienceItems, Item, languagesItems, toolsItems } from '@/app/about/about';

type Section = { title: string, ref: string, items: Item[] };
const sections: Section[] = [
  {
    title: 'Experience',
    ref: 'experience',
    items: experienceItems,
  },
  {
    title: 'Education',
    ref: 'education',
    items: educationItems,
  },
  {
    title: 'Certifications',
    ref: 'certifications',
    items: certificationsItems,
  },
  {
    title: 'Languages and Environments',
    ref: 'languages',
    items: languagesItems,
  },
  {
    title: 'Development Tools',
    ref: 'tools',
    items: toolsItems,
  },
];

type TOCSection = { title: string, ref: string };
const toc: TOCSection[] = [ { title: 'About Me', ref: 'aboutme' }, ...sections ];

export default function About() {
  return (
    <div id="top" className="container mx-auto flex flex-wrap justify-between">
      <div className="w-full lg:w-1/2 my-2">
        <div className="mb-4 p-5 overflow-hidden rounded-lg lg:hidden">
          <h1 className="font-bold text-3xl border-b mb-4">
            Sections
          </h1>
          <ul className='flex flex-wrap'>
            {toc.map((section) => <li key={section.ref} className="w-full sm:w-auto m-2">
              <a href={'#' + section.ref} className="block py-2 md:py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg border-b">
                {section.title}
              </a>
            </li>)}
          </ul>
        </div>
        <div id="aboutme" className="p-5 overflow-hidden rounded-lg text-justify">
          <div className="float-right lg:hidden text-sm text-gray-500">
            <a href="#top">
              jump back to top
            </a>
          </div>
          <div className="space-y-4">
            <h1 className="font-bold text-3xl border-b">
              About Me
            </h1>
            <p>
              I am <b>Simon Karman</b> MSc. I am a cloud consultant and hobbyist game developer and a former student at the Utrecht University. I
              currently work at Xebia Cloud.
            </p>
            <Image width={256} height={256} alt={'Simon Karman'} src="/simonkarman.png" className="mx-auto my-6 h-64 w-64 shadow-md rounded-lg" />
            <p>
              I love to take the lead in the architecture and development of new products and features. While doing so, I believe that developers
              should all apply a modern way of working. Examples are: automated testing, boy scout principle, pull requests, api first, event driven,
              developer happiness, and failing fast. I personally advocate for these (and more) practices whenever I can, and I am always open to
              learn more.
            </p>
            <p>
              Development culture is key. I personally get excited from ensuring developer ergonomics. This includes build, improving, and sharing:
              command line tools, infrastructure libraries, and application libraries.
            </p>
            <p>
              We as developers should fully embrace CI/CD. It enables a team to move approvals away from a personal responsibility, to make the CI/CD
              process and automated testing the approval process itself. If your pipeline reaches the &apos;deploy to production&apos;-stage, you
              should feel confident to release.
            </p>
            <p>
              It is important to constantly challenge yourself, reflect and to strive for doing better. Do achieve this I believe it is important to
              share our knowledge and experience. For this reason I love open source, and also love to share my own experiences and stories. I can
              give presentations about development best practices or host sessions about technical topics.
            </p>
            <h1 className="font-bold text-3xl border-b pt-4">
              A bit of history
            </h1>
            <p>
              Since primary school I have been developing games. It all started with creating board games for my friends. In the last years on primary
              school I started programming some computer games for my friends as well. At this point I already enjoyed creating games more than I did
              playing them. And since I like playing games so much, this means a lot!
            </p>
            <p>
              The two games I played most are Call of Duty 4 and Minecraft, both on PC. I did spent a lot of time with both games mainly because of
              the modding and map making communities they contain. I have made my own contributions to these communities, especially in content
              creation.
            </p>
            <p>
              Like programming I also love mathematics. My passion for finding simple, generic, and maintainable solutions concerning mathematical and
              architectural challenges and my love for creating and playing boardgames is what formed the basis of my interest in the field of
              Software Architecture and Game Technology.
            </p>
            <h2 className="pt-2 font-bold text-lg border-b">
              Hogeschool van Amsterdam (Bachelor)
            </h2>
            <p>
              In June 2014 I graduated at the University of Applied Sciences in Amsterdam. The field of this bachelor was Informatics with Game
              Technology as specialization. During this study I did two amazing internships. First one at <a
                href="https://www.talespin.company/sticky-studios-joins-talespin/"
                className="text-red-600 underline hover:text-red-800"
                target="_blank" rel="noreferrer"
              >
              Sticky Studios
              </a> in Utrecht and the second one at <a
                href="https://www.coolgames.com/2016/02/23/boostermedia-becomes-coolgames-and-joins-forces-with-tingly-games/"
                className="text-red-600 underline hover:text-red-800"
                target="_blank" rel="noreferrer"
              >
              Tingly Games
              </a> in Rotterdam.
            </p>
            <h2 className="pt-2 font-bold text-lg border-b">
              Utrecht University (Master)
            </h2>
            <p>
              In September 2014 I started studying at the Utrecht University where I finished the two year Master’s programme: Game and Media
              Technology (GMT). The Master’s programme focussed on the technological aspects of gaming and multimedia in the context of computer
              science. Geometric Algorithms was the course that fascinated me the most. After writing my master thesis on &apos;Generating Sokoban
              Levels that are Interesting to Play using Simulation&apos; the university awarded me a masters degree giving me the title Master of
              Science.
            </p>
            <p>
              During my master at the Utrecht University I joined Study association Sticky. Sticky is a non-profit organisation that organises a
              variety of activities for her members, computer science and information science students at Utrecht University. As Commissioner of
              External Relationships I was responsible for the income during the year 2016-2017. That year I acquired new sponsors, kept in contact
              with existing sponsors and planned study, job and company related events for her members. As <a
                href="https://svsticky.nl/besturen/11"
                className="text-red-600 underline hover:text-red-800"
                target="_blank" rel="noreferrer"
              >
                board member
              </a> of the 11th board, I was also responsible for several committees and organising activities for the 1100 members of Sticky.
            </p>
            <h2 className="pt-2 font-bold text-lg border-b">
              Quintor
            </h2>
            <p>
              From September 2018 until September 2021 I worked for Quintor as an IT Consultant. I started with a 2 month masterclass learning the
              basics of working at Quintor. After this masterclass I started at ING Bank to work on a compensation system of the ING Service Points
              through the country. After ING I started in June 2019 at Tikkie (part of ABN Amro Bank) to work as AWS Cloud Engineer, TypeScript
              Programmer, and Java Backend Developer to build the business to consumer side of the Tikkie platform.
            </p>
            <h2 className="pt-2 font-bold text-lg border-b">
              Xebia Cloud
            </h2>
            <p>
              Since October 2021 I am working for Xebia Cloud (formerly known as Binx.io). Our aim is to make every organization cloud native. As a
              cloud consultant I use my expertise to ensure our clients make effective use of cloud solutions ranging from serverless applications, to
              apis, to CI/CD pipelines, and to infrastructure as code solutions. I focus on Amazon Web Services (AWS) and the Google Cloud Platform
              (GCP). I started this journey helping Felyx, by building and migrating to a new landing zone for the Kubernetes workloads on GCP using
              Terraform and GKE. After this I help DPG Media, TuneIn, and ABN AMRO Clearing Bank.
            </p>

          </div>
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-1/2">
        {sections.map((section) => <div key={section.ref} id={section.ref}>
          <div className="pr-5 py-5 pl-3 overflow-hidden rounded-lg my-2">
            <div className="float-right lg:hidden text-sm text-gray-500">
              <a href="#top">
                jump back to top
              </a>
            </div>
            <h1 className="mb-4 ml-2 font-bold text-3xl border-b">
              { section.title }
            </h1>
            {section.items.map((item, index) =>
              <div
                key={index}
                className={(item.until === null ? 'border-darkblue-400 ' : 'border-b-gray-100 ')
                  + 'border-b border-t mb-3 flex gap-4 items-center justify-between rounded-l-md border-l-8 pl-3 py-1'}
              >
                <div className='flex-grow'>
                  <div className={item.until === null ? 'text-darkblue-800' : 'text-gray-800'}>
                    {item.link === undefined && <div>
                      {item.info}
                    </div>}
                    {item.link !== undefined && <div className="underline">
                      <a href={item.link} target="_blank" rel="noreferrer">
                        {item.info}
                      </a>
                    </div>}
                  </div>
                  <div className={(item.until === null ? 'text-darkblue-600' : 'text-gray-400') + ' text-xs'}>
                    {item.until === null ? `since ${item.at}` : `${item.at} to ${item.until}`}
                  </div>
                </div>
                <div className="flex-grow-0 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/about-icons/${item.img}.png`}
                    alt={item.img}
                    className="h-8 max-w-24 ml-2 my-2"
                  />
                </div>
              </div>,
            )}
          </div>
        </div>,
        )}
      </div>
    </div>
  );
}
