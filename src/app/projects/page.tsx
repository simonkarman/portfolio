import { Suspense } from 'react';
import { getAllProjects } from '@/projects/get-all-projects';
import { FilterableProjects, FilterableProjectsWithSearchFromParams } from '@/app/projects/filterable-projects';

export default function ProjectsWrapper() {
  const projects = getAllProjects();
  return <Suspense fallback={<FilterableProjects initialQuery={''} projects={Promise.resolve([])} />}>
    <FilterableProjectsWithSearchFromParams projects={projects}/>
  </Suspense>;
}
