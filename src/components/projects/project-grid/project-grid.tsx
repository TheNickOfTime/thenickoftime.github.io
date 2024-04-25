import { useContext, useState } from 'react';
import {
	ProjectBrowserContext,
	ProjectBrowserContextType,
} from '../project-browser/project-browser-context';

import ProjectCard from '../project-card/project-card';
import './project-grid.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBackward,
	faBackwardStep,
	faCaretLeft,
	faCaretRight,
	faForward,
	faForwardStep,
} from '@fortawesome/free-solid-svg-icons';

const Projects = ({ projects }) => {
	return (
		<div id='project-cards'>
			{projects.map((project) => {
				return <ProjectCard project={project} key={project.name} />;
			})}
		</div>
	);
};

const PageSelector = ({ pagesCount, pageIndex, setPageIndex }) => {
	return (
		<div id='page-selectors'>
			<FontAwesomeIcon
				id='first'
				className={'page-control' + (pageIndex == 0 ? ' disabled' : '')}
				icon={faBackward}
				onClick={() => setPageIndex(0)}
			/>
			<FontAwesomeIcon
				id='previous'
				className={'page-control' + (pageIndex == 0 ? ' disabled' : '')}
				icon={faBackwardStep}
				onClick={() => setPageIndex(pageIndex - 1 < 0 ? pageIndex : pageIndex - 1)}
			/>
			{[...Array(pagesCount).keys()].map((index) => (
				<span
					className={'page-selector' + (pageIndex == index ? ' current' : '')}
					onClick={() => setPageIndex(index)}
				>
					{index + 1}
				</span>
			))}
			<FontAwesomeIcon
				id='next'
				className={'page-control' + (pageIndex == pagesCount - 1 ? ' disabled' : '')}
				icon={faForwardStep}
				onClick={() =>
					setPageIndex(pageIndex + 1 >= pagesCount ? pageIndex : pageIndex + 1)
				}
			/>
			<FontAwesomeIcon
				id='last'
				className={'page-control' + (pageIndex == pagesCount - 1 ? ' disabled' : '')}
				icon={faForward}
				onClick={() => setPageIndex(pagesCount - 1)}
			/>
		</div>
	);
};

export default function ProjectGrid() {
	const context: ProjectBrowserContextType = useContext(ProjectBrowserContext)!;

	const projectsPerPage: number = 12;
	const pagesCount: number = Math.ceil(context.filteredProjects.length / projectsPerPage);
	const [pageIndex, setPageIndex] = useState(0);

	return (
		<div id='project-grid'>
			<Projects
				projects={context.filteredProjects.slice(
					pageIndex * projectsPerPage,
					pageIndex * projectsPerPage + projectsPerPage
				)}
			/>
			<PageSelector
				pagesCount={pagesCount}
				pageIndex={pageIndex}
				setPageIndex={setPageIndex}
			/>
		</div>
	);
}
