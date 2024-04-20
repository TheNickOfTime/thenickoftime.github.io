import { useContext } from 'react';
import {
	ProjectBrowserContext,
	ProjectBrowserContextType,
} from '../project-browser/project-browser-context';

import ProjectCard from '../project-card/project-card';
import './project-grid.scss';

export default function ProjectGrid() {
	const context: ProjectBrowserContextType = useContext(ProjectBrowserContext)!;

	const Projects = () => {
		return Object.values(context.filteredProjects).map((project) => {
			return <ProjectCard project={project} key={project.metadata.name} />;
		});
	};

	return (
		<div id='project-grid'>
			<Projects />
		</div>
	);
}
