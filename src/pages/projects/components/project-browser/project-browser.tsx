// Dependencies ------------------------------------------------------------------------------------
import { /*createContext,*/ useState } from 'react';

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
	projectFeatured?: number;
}

export interface Projects {
	[key: string]: Project;
}

export interface Tags {
	[index: string]: boolean;
}

// Context -----------------------------------------------------------------------------------------
// const ProjectBrowserContext = createContext();

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

	const sortingOptions: string[] = [
		'Featured',
		'Alphabetical',
		// 'Date'
	];

	const sortingOrder: string[] = ['Ascending', 'Descending'];

	// State -------------------------------------------------------------------
	const [tags, setTags] = useState(initialTags);
	const [projectCount, setProjectCount] = useState(0);
	const [sortBy, setSortBy] = useState(sortingOptions[0]);
	const [sortOrder, setSortOrder] = useState(sortingOrder[1]);

	return (
		<div id='project-browser'>
			{/* <ProjectBrowserContext.Provider value={context}> */}
			<ProjectsToolbar
				// Projects
				projectCount={projectCount}
				// Tags
				tags={tags}
				setTags={setTags}
				// Sorting
				sortingOptions={sortingOptions}
				sortBy={sortBy}
				setSortBy={setSortBy}
				sortingOrder={sortingOrder}
				sortOrder={sortOrder}
				setSortOrder={setSortOrder}
			/>
			<ProjectGrid
				projects={projects}
				setProjectCount={setProjectCount}
				tags={tags}
				sortBy={sortBy}
				sortOrder={sortOrder}
			/>
			{/* </ProjectBrowserContext.Provider> */}
		</div>
	);
}
