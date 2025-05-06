import { Suspense } from 'react';
import { getAllProjects } from '@/utils/projects/get-all-projects';
import { FilterableProjects } from '@/app/projects/filterable-projects';

export default function ProjectsWrapper() {
  const projects = getAllProjects();
  return <div className="container mx-auto">
    <Suspense fallback={<FilterableProjects projects={Promise.resolve([])} />}>
      <FilterableProjects projects={projects}/>
    </Suspense>
  </div>;
}
