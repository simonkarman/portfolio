'use client';

import { ProjectWithProviderName } from '@/projects/project';
import { useSearchParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import _ from 'lodash';
import Link from 'next/link';
import { Card } from '@/components/card';
import { SearchBar } from '@/app/projects/search-bar';
import { DateTime } from 'luxon';

export function FilterableProjectsWithSearchFromParams(props: { projects: Promise<ProjectWithProviderName[]> }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  return <FilterableProjects projects={props.projects} initialQuery={initialQuery} />;
}

export function FilterableProjects(props: { initialQuery: string, projects: Promise<ProjectWithProviderName[]> }) {
  const [searchFilter, setSearchFilter] = useState(props.initialQuery);
  const [simpleView, setSimpleView] = useState(false);
  const [numberOfYearsShowing, setNumberOfYearsShowing] = useState(2);
  const { ref, inView } = useInView({ threshold: 0.1 });

  const projects = use(props.projects);
  const projectsPerYear = _(projects)
    .sortBy(project => -DateTime.fromISO(project.date))
    .groupBy(project => DateTime.fromISO(project.date).year)
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
  }, [inView, simpleView, searchFilter]);

  useEffect(() => {
    setNumberOfYearsShowing(2);
  }, [searchFilter]);

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
              matches(searchFilter, 'name', project.slug) ||
              matches(searchFilter, 'name', project.title);
          }),
      }))
      .filter(projectsOfYear => projectsOfYear.projects.length > 0);

  return (
    <>
      <SearchBar
        setSimpleView={setSimpleView}
        simpleView={simpleView}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />

      {filteredProjectsPerYear
        .slice(0, simpleView ? filteredProjectsPerYear.length : numberOfYearsShowing)
        .map(projectsOfYear => (
          <div key={projectsOfYear.year} className="w-full p-5">
            <h2 className="border-b font-bold text-2xl lg:text-xl my-3 px-2 pb-1 text-center">
              {projectsOfYear.projects.length} {projectsOfYear.projects.length === 1 ? 'project' : 'projects'} in {projectsOfYear.year}
            </h2>

            {simpleView ? (
              <ul className="px-2">
                {projectsOfYear.projects.map(project => (
                  <li key={project.slug} className="my-6 text-center">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-red-600 underline hover:text-red-800 mr-2"
                    >
                      <span>{project.title}</span>
                    </Link>
                    <br/>
                    <span>{project.description}</span>
                    <br/>
                    <span className="text-gray-400 pr-2 text-sm border-r">{project.date}</span>
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
                    key={project.slug}
                    title={project.title}
                    date={project.date}
                    image={{
                      src: project.image,
                      alt: 'Project Image',
                    }}
                    link={{ to: `/projects/${project.slug}` }}
                    tags={[project.slug, ...(project.tags || [])]}
                  >
                    <p>{project.description}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ))}

      {!simpleView && filteredProjectsPerYear.length >= numberOfYearsShowing && (
        <div ref={ref} className="w-full">
          <h2 className="border-b font-bold text-2xl lg:text-xl my-3 px-2 text-center">
            Loading...
          </h2>
          <div className="flex flex-wrap">
            <Card image={{ src: '/card.jpg', alt: 'Loading' }} title="Loading more projects..."/>
            <Card image={{ src: '/card.jpg', alt: 'Loading' }} title="Loading more projects..."/>
          </div>
        </div>
      )}
    </>
  );
}
