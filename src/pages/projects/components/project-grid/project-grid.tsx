import ProjectCard from '../project-card/project-card';
import { Project, Projects, Tags } from '../project-browser/project-browser';

interface Params {
	projects: Projects;
	tags: Tags;
	setProjectCount: React.Dispatch<React.SetStateAction<number>>;
	sortBy: string;
	sortOrder: string;
}

export default function ProjectGrid({
	projects,
	setProjectCount,
	tags,
	sortBy,
	sortOrder,
}: Params) {
	// console.log(Object.values(tags));

	const shouldFilter = !Object.values(tags).every((tag) => !tag);

	const sortAlphabetical = (projects: Project[]) => {
		const sortedProjects = projects.sort((a, b) => {
			const after = a.projectName.toLowerCase() > b.projectName.toLowerCase();
			const before = a.projectName.toLowerCase() < b.projectName.toLowerCase();

			return after ? 1 : before ? -1 : 0;
		});

		return sortOrder == 'Descending' ? sortedProjects : sortedProjects.reverse();
	};

	const sortFeatured = (projects: Project[]) => {
		const sortedProjects = sortAlphabetical(projects).sort((a, b) => {
			const aRank = a.projectFeatured ? a.projectFeatured : 0;
			const bRank = b.projectFeatured ? b.projectFeatured : 0;

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

	const unfilteredProjects = (projects: Project[]) => {
		setProjectCount(projects.length);

		return projects;
	};

	const filteredProjects = (projects: Project[]) => {
		const projectsFiltered = projects.filter((project) => {
			const currentTags = Object.keys(tags).filter((key) => tags[key]);
			const projectInTags = project.projectTags.some((tag) => currentTags.includes(tag));
			return projectInTags;
		});

		setProjectCount(projectsFiltered.length);

		return projectsFiltered;
	};

	const Projects = () => {
		let projectsToRender = Object.values(projects);
		projectsToRender = sortProjects(projectsToRender);
		projectsToRender = shouldFilter
			? filteredProjects(projectsToRender)
			: unfilteredProjects(projectsToRender);

		return projectsToRender.map((project: Project) => {
			return <ProjectCard project={project} key={project.projectName} />;
		});
	};

	return (
		<div id='projects'>
			<Projects />
		</div>
	);
}
