'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import _ from 'lodash';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/card';
import { getAllProjects } from '@/utils/projects';

type SearchProps = {
  simpleView: boolean,
  setSimpleView: (value: boolean) => void,
  searchFilter: string,
  setSearchFilter: (value: string) => void,
}

const Search = (props: SearchProps) => {
  const { simpleView, setSimpleView, searchFilter, setSearchFilter } = props;
  return <div className="w-full my-2 p-5">
    <div className="flex mb-4 justify-between items-end border-b">
      <h1 className="font-bold text-3xl">
        Portfolio
      </h1>
      <button onClick={() => setSimpleView(!simpleView)} className="text-sm text-gray-600">
        Switch to {!simpleView ? 'Simple' : 'Raster'} View
      </button>
    </div>
    <p className="pb-2">
      This page gives an overview of all the work in my portfolio.
      You can search for specific projects using the search bar below.
      You can search based on name or the tags of the project.
    </p>
    <p>
      For example the search term &#39;tag:unity&#39; shows you all projects that were build with the Unity3D engine.
    </p>
    <div className="flex my-2 w-full">
      <input
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        placeholder="Advanced search (for example: 'infinite' or 'tag:unity')"
        type="text"
        className="flex-1 py-1 px-3 border rounded-l"
      />
      <button
        onClick={() => setSearchFilter('')}
        className="py-1 px-3 bg-gray-300 hover:bg-gray-200 rounded-r"
      >
        Clear
      </button>
    </div>
  </div>;
};
export default function ProjectsWrapper() {
  return <Suspense><Projects/></Suspense>;
}
function Projects() {
  const searchParams = useSearchParams();
  const [searchFilter, setSearchFilter] = useState(searchParams.get('q') || '');
  const [simpleView, setSimpleView] = useState(false);
  const [numberOfYearsShowing, setNumberOfYearsShowing] = useState(2);
  const { ref, inView } = useInView({ threshold: 0.1 });

  const projectsPerYear = _(getAllProjects())
    .sortBy(project => -project.date)
    .groupBy(project => project.date.year)
    .map((projects, year) => ({
      year,
      projects,
    }))
    .sortBy('year')
    .reverse()
    .value();

  useEffect(() => {
    if (inView && !simpleView) {
      setNumberOfYearsShowing(prev => prev + 1);
    }
  }, [inView, simpleView]);

  const matches = (needle: string, prefix: string, haystack: string) => {
    needle = needle.toLowerCase();
    prefix = prefix.toLowerCase();
    haystack = haystack.toLowerCase();
    return `${needle.startsWith(`${prefix}:`) && needle.length >= prefix.length + 2 ? `${prefix}:` : ''}${haystack}`.includes(needle);
  };

  // Filtered projects computation
  const filteredProjectsPerYear = searchFilter === ''
    ? projectsPerYear
    : projectsPerYear
      .map(projectsOfYear => ({
        year: projectsOfYear.year,
        projects: projectsOfYear.projects
          .filter((project) => {
            return (project.tags !== undefined && project.tags.some(tag => matches(searchFilter, 'tag', tag))) ||
              matches(searchFilter, 'name', project.name) ||
              matches(searchFilter, 'name', project.title);
          }),
      }))
      .filter(projectsOfYear => projectsOfYear.projects.length > 0);

  return (
    <div className="container mx-auto">
      <Search setSimpleView={setSimpleView} simpleView={simpleView} searchFilter={searchFilter} setSearchFilter={setSearchFilter} />

      {filteredProjectsPerYear
        .slice(0, (!simpleView && searchFilter.length === 0) ? numberOfYearsShowing : filteredProjectsPerYear.length)
        .map(projectsOfYear => (
          <div key={projectsOfYear.year} className="w-full p-5">
            <h2 className="border-b font-bold text-2xl lg:text-xl my-3 px-2 pb-1 text-center">
              {projectsOfYear.projects.length} {projectsOfYear.projects.length === 1 ? 'project' : 'projects'} in {projectsOfYear.year}
            </h2>

            {simpleView ? (
              <ul className="px-2">
                {projectsOfYear.projects.map(project => (
                  <li key={project.name} className="my-6 text-center">
                    <Link
                      href={`/projects/${project.name}`}
                      className="text-red-600 underline hover:text-red-800 mr-2"
                    >
                      <span>{project.title}</span>
                    </Link>
                    <br/>
                    <span>{project.description}</span>
                    <br/>
                    <span className="text-gray-400 pr-2 text-sm border-r">{project.date.toFormat('yyyy-MM-dd')}</span>
                    {project.tags && project.tags.map(tag => (
                      <span key={tag} className="mx-1.5 text-sm text-gray-500">#{tag}</span>
                    ))}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-wrap gap-4 lg:gap-0">
                {projectsOfYear.projects.map(project => (
                  <Card
                    key={project.name}
                    title={project.title}
                    date={project.date}
                    image={{
                      src: project.image,
                      alt: 'Project Image',
                    }}
                    link={{ to: `/projects/${project.name}` }}
                    tags={[project.name, ...(project.tags || [])]}
                  >
                    <p>{project.description}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ))}

      {!simpleView && filteredProjectsPerYear.length > numberOfYearsShowing && (
        <div ref={ref} className="w-full">
          <h2 className="border-b font-bold text-2xl lg:text-xl my-3 px-2 text-center">
            Loading...
          </h2>
          <div className="flex flex-wrap">
            <Card image={{ src: '/loading.png', alt: 'Loading' }} title="Loading more projects..."/>
            <Card image={{ src: '/loading.png', alt: 'Loading' }} title="Loading more projects..."/>
          </div>
        </div>
      )}
    </div>
  );
}
