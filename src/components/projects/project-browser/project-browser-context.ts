import { createContext } from 'react';
import { MultiselectOptions, ProjectMetadata } from 'src/types/project';
// import { ShowOptions, SortByOptions, SortOrderOptions } from './project-browser-options';
// import

export interface ProjectBrowserContextType {
	// projects: Projects;
	filteredProjects: ProjectMetadata[];
	show: string;
	tags: MultiselectOptions;
	types: MultiselectOptions;
	sortBy: string;
	sortOrder: string;
}

export const ProjectBrowserContext = createContext<ProjectBrowserContextType | null>(null);
