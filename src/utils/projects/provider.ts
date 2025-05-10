'use server';

import { ProjectWithoutProviderName } from './project';
import { ReactElement } from 'react';

export interface Provider {
  getProjects(): Promise<ProjectWithoutProviderName[]>;
  render(project: ProjectWithoutProviderName): ReactElement;
}
