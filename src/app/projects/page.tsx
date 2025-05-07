import { Suspense } from 'react';
import { getAllProjects } from '@/utils/projects/get-all-projects';
import { FilterableProjects, FilterableProjectsWithSearchFromParams } from '@/app/projects/filterable-projects';

export default function ProjectsWrapper() {
  const projects = getAllProjects();
  return <div className="container mx-auto">
    <Suspense fallback={<FilterableProjects initialQuery={''} projects={Promise.resolve([])} />}>
      <FilterableProjectsWithSearchFromParams projects={projects}/>
    </Suspense>
  </div>;
}
