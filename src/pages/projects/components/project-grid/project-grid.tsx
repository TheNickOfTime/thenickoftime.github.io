import ProjectCard from '../project-card/project-card';
import { Project, Projects, Tags } from '../project-browser/project-browser';

interface Params {
	projects: Projects;
	tags: Tags;
	setProjectCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function ProjectGrid({ projects, tags, setProjectCount }: Params) {
	// console.log(Object.values(tags));

	const shouldFilter = !Object.values(tags).every((tag) => !tag);

	const unfilteredProjects = () => {
		const projectsUnfiltered = Object.values(projects);

		setProjectCount(projectsUnfiltered.length);

		return projectsUnfiltered;
	};

	const filteredProjects = () => {
		const projectsUnfiltered = Object.values(projects);
		const tagsFiltered = projectsUnfiltered.filter((project) => {
			const currentTags = Object.keys(tags).filter((key) => tags[key]);
			const projectInTags = project.projectTags.some((tag) => currentTags.includes(tag));
			return projectInTags;
		});

		const projectsFiltered = tagsFiltered;

		setProjectCount(projectsFiltered.length);

		return projectsFiltered;
	};

	const Projects = () => {
		const projectsToRender = shouldFilter ? filteredProjects() : unfilteredProjects();

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
