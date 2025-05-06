'use server';

import { Project } from './project';
import { ReactElement } from 'react';

export interface Provider {
  getProjects(): Promise<Project[]>;
  render(project: Project): ReactElement;
}
