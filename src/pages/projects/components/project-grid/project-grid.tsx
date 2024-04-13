import ProjectCard from '../project-card/project-card';
import { Project, Projects, MultiselectOptions } from 'src/types/project';

interface Params {
	projects: Projects;
	show: string;
	tags: MultiselectOptions;
	types: MultiselectOptions;
	setProjectCount: React.Dispatch<React.SetStateAction<number>>;
	sortBy: string;
	sortOrder: string;
}

export default function ProjectGrid({
	projects,
	setProjectCount,
	show,
	tags,
	types,
	sortBy,
	sortOrder,
}: Params) {
	// console.log(Object.values(tags));

	const sortAlphabetical = (projects: Project[]) => {
		const sortedProjects = projects.sort((a, b) => {
			const after = a.metadata.name.toLowerCase() > b.metadata.name.toLowerCase();
			const before = a.metadata.name.toLowerCase() < b.metadata.name.toLowerCase();

			return after ? 1 : before ? -1 : 0;
		});

		return sortOrder == 'Descending' ? sortedProjects : sortedProjects.reverse();
	};

	const sortFeatured = (projects: Project[]) => {
		const sortedProjects = sortAlphabetical(projects).sort((a, b) => {
			const aRank = a.metadata.featured ? a.metadata.featured : 0;
			const bRank = b.metadata.featured ? b.metadata.featured : 0;

			return bRank - aRank;
		});

		return sortedProjects;
	};

	const sortProjects = (projects: Project[]) => {
		switch (sortBy) {
			case 'Alphabetical':
				return sortAlphabetical(projects);
			case 'Featured':
				return sortFeatured(projects);
			default:
				return sortAlphabetical(projects);
		}
	};

	const filterFeatured = (projects: Project[]) => {
		return projects.filter((project) => project.metadata.featured);
	};

	const filterTags = (projects: Project[]) => {
		return projects.filter((project) => {
			// Filter Tags
			const currentTags = Object.keys(tags).filter((key) => tags[key]);
			const projectInTags = project.metadata.tags.some((tag) => currentTags.includes(tag));
			return projectInTags;
		});
	};

	const filterTypes = (projects: Project[]) => {
		return projects.filter((project) => {
			// Filter types
			const currentTypes = Object.keys(types).filter((key) => types[key]);
			const projectInTypes = currentTypes.includes(project.metadata.type);
			return projectInTypes;
		});
	};

	const filterProjects = (projects: Project[]) => {
		let projectsFiltered = projects;

		const shouldFilterFeatured = show == 'Featured Only';
		projectsFiltered = shouldFilterFeatured
			? filterFeatured(projectsFiltered)
			: projectsFiltered;

		const shouldFilterTags = !Object.values(tags).every((tag) => !tag);
		projectsFiltered = shouldFilterTags ? filterTags(projectsFiltered) : projectsFiltered;

		const shouldFilterTypes = !Object.values(types).every((type) => !type);
		projectsFiltered = shouldFilterTypes ? filterTypes(projectsFiltered) : projectsFiltered;

		setProjectCount(projectsFiltered.length);

		return projectsFiltered;
	};

	const Projects = () => {
		let projectsToRender = Object.values(projects);
		projectsToRender = sortProjects(projectsToRender);
		projectsToRender = filterProjects(projectsToRender);

		return projectsToRender.map((project: Project) => {
			return <ProjectCard project={project} key={project.metadata.name} />;
		});
	};

	return (
		<div id='projects'>
			<Projects />
		</div>
	);
}
