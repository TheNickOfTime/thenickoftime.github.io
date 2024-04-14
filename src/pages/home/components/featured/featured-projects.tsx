import { Project, Projects, ProjectMetadata } from 'src/types/project';

import ProjectCard from 'src/pages/projects/components/project-card/project-card';

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
			<ProjectCards />
		</div>
	);
}
