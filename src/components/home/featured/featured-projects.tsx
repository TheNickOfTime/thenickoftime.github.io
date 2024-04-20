import { NavLink } from 'react-router-dom';
import { Project, Projects } from 'src/types/project';

import ProjectCard from '../../projects/project-card/project-card';
import './featured-projects.scss';

const ProjectCards = () => {
	const projects: Projects = import.meta.glob('/src/projects/portfolio/*.mdx', {
		eager: true,
	});

	const featuredProjects: Project[] = Object.values(projects).filter((project) => {
		return project.metadata.featured;
	});

	return (
		<div id='project-scroll'>
			<div id='project-cards'>
				{featuredProjects.map((project) => (
					<ProjectCard project={project} />
				))}
			</div>
		</div>
	);
};

export default function FeaturedProjects() {
	return (
		<div id='featured-projects'>
			<div id='projects-title'>
				<h1>Featured Projects</h1>
				<NavLink id='all-projects' className='button' to='/projects'>
					See All Projects
				</NavLink>
			</div>
			<div id='projects-container'>
				<ProjectCards />
			</div>
		</div>
	);
}
