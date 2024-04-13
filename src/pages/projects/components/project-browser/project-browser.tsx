// Dependencies ------------------------------------------------------------------------------------
import { /*createContext,*/ useState } from 'react';

import { Project, Projects, MultiselectOptions } from 'src/types/project';

import ProjectsToolbar from '../project-toolbar/projects-toolbar';
import ProjectGrid from '../project-grid/project-grid';

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
	const allTags: MultiselectOptions = Object.values(projects).reduce(
		(previous: MultiselectOptions, current: Project) => {
			const uniqueKeys = current.metadata.tags
				.filter((key: string) => !Object.keys(previous).includes(key))
				.map((key: string) => [key, false]);
			return { ...previous, ...Object.fromEntries(uniqueKeys) };
		},
		{}
	);

	const allTypes: MultiselectOptions = Object.values(projects).reduce(
		(previous: MultiselectOptions, current: Project) => {
			const unique = !Object.keys(previous).includes(current.metadata.type);
			return unique ? { ...previous, ...{ [current.metadata.type]: false } } : previous;
		},
		{}
	);

	const showOptions: string[] = ['Featured Only', 'All'];

	// Define sorting options & order
	const sortingOptions: string[] = [
		'Featured',
		'Alphabetical',
		// 'Date'
	];

	const sortingOrder: string[] = ['Ascending', 'Descending'];

	// State -------------------------------------------------------------------
	const [show, setShow] = useState(showOptions[0]);
	const [tags, setTags] = useState(allTags);
	const [types, setTypes] = useState(allTypes);
	const [projectCount, setProjectCount] = useState(0);
	const [sortBy, setSortBy] = useState(sortingOptions[0]);
	const [sortOrder, setSortOrder] = useState(sortingOrder[1]);

	return (
		<div id='project-browser'>
			{/* <ProjectBrowserContext.Provider value={context}> */}
			<ProjectsToolbar
				// Projects
				projectCount={projectCount}
				// Show
				showOptions={showOptions}
				show={show}
				setShow={setShow}
				// Tags
				tags={tags}
				setTags={setTags}
				// Types
				types={types}
				setTypes={setTypes}
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
				show={show}
				tags={tags}
				types={types}
				sortBy={sortBy}
				sortOrder={sortOrder}
			/>
			{/* </ProjectBrowserContext.Provider> */}
		</div>
	);
}
