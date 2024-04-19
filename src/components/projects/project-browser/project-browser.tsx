/* eslint-disable react-hooks/exhaustive-deps */

// Dependencies ------------------------------------------------------------------------------------
import { useEffect, useState } from 'react';

import { Project, Projects, MultiselectOptions } from 'src/types/project';
import { ProjectBrowserContext, ProjectBrowserContextType } from './project-browser-context';
import { ShowOptions, SortByOptions, SortOrderOptions } from './project-browser-options';
import FilterAndSortProjects from './project-filtering-sorting';

import ProjectsToolbar from '../project-toolbar/projects-toolbar';
import ProjectGrid from '../project-grid/project-grid';

// Component ---------------------------------------------------------------------------------------
export function ProjectBrowser() {
	// Variables ---------------------------------------------------------------
	const projects: Projects = import.meta.glob('/src/projects/portfolio/*.mdx', {
		eager: true,
	});

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

	// State -------------------------------------------------------------------
	const [filteredProjects, setFilteredProjects] = useState(Object.values(projects));
	const [show, setShow] = useState(ShowOptions.Featured.toString());
	const [tags, setTags] = useState(allTags);
	const [types, setTypes] = useState(allTypes);
	const [sortBy, setSortBy] = useState(SortByOptions.Featured.toString());
	const [sortOrder, setSortOrder] = useState(SortOrderOptions.Descending.toString());

	const context: ProjectBrowserContextType = {
		filteredProjects: filteredProjects,
		show: show,
		tags: tags,
		types: types,
		sortBy: sortBy,
		sortOrder: sortOrder,
	};

	// Filtering & Sorting -----------------------------------------------------
	useEffect(() => {
		setFilteredProjects(FilterAndSortProjects(projects, show, tags, types, sortBy, sortOrder));
	}, [show, tags, types, sortBy, sortOrder]);

	return (
		<div id='project-browser'>
			<ProjectBrowserContext.Provider value={context}>
				<ProjectsToolbar
					setShow={setShow}
					setTags={setTags}
					setTypes={setTypes}
					setSortBy={setSortBy}
					setSortOrder={setSortOrder}
				/>
				<ProjectGrid />
			</ProjectBrowserContext.Provider>
		</div>
	);
}
