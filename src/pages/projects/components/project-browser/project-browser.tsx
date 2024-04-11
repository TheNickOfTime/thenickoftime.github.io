// Dependencies ------------------------------------------------------------------------------------
import { useState } from 'react';

import { MDXContent } from 'mdx/types';

import ProjectsToolbar from '../project-toolbar/projects-toolbar';
import ProjectGrid from '../project-grid/project-grid';

//Types --------------------------------------------------------------------------------------------
export interface Project {
	default: MDXContent;
	projectName: string;
	projectThumb: string;
	projectTags: string[];
	projectLinks: { [index: string]: string };
}

export interface Projects {
	[key: string]: Project;
}

export interface Tags {
	[index: string]: boolean;
}

// Component ---------------------------------------------------------------------------------------
export function ProjectBrowser() {
	// Variables ---------------------------------------------------------------

	// Get projects from the project folder
	const projects: Projects = import.meta.glob('/src/projects/portfolio/*.mdx', {
		eager: true,
	});

	// Get all unique tags from the projects
	const initialTags: Tags = Object.values(projects).reduce((previous: Tags, current: Project) => {
		const uniqueKeys = current.projectTags
			.filter((key: string) => !Object.keys(previous).includes(key))
			.map((key: string) => [key, false]);
		return { ...previous, ...Object.fromEntries(uniqueKeys) };
	}, {});

	// State -------------------------------------------------------------------
	const [tags, setTags] = useState(initialTags);

	return (
		<div id='project-browser'>
			{/* <ProjectBrowserContext.Provider value={context}> */}
			<ProjectsToolbar tags={tags} setTags={setTags} />
			<ProjectGrid tags={tags} projects={projects} />
			{/* </ProjectBrowserContext.Provider> */}
		</div>
	);
}
