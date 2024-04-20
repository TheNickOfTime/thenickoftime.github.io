import { MultiselectOptions, Project, Projects } from 'src/types/project';

const sortAlphabetical = (projects: Project[], sortOrder: string) => {
	const sortedProjects = projects.sort((a, b) => {
		const after = a.metadata.name.toLowerCase() > b.metadata.name.toLowerCase();
		const before = a.metadata.name.toLowerCase() < b.metadata.name.toLowerCase();

		return after ? 1 : before ? -1 : 0;
	});

	return sortOrder == 'Descending' ? sortedProjects : sortedProjects.reverse();
};

const sortFeatured = (projects: Project[], sortOrder: string) => {
	const sortedProjects = sortAlphabetical(projects, sortOrder).sort((a, b) => {
		const aRank = a.metadata.featured ? a.metadata.featured : Infinity;
		const bRank = b.metadata.featured ? b.metadata.featured : Infinity;

		return aRank - bRank;
	});

	return sortedProjects;
};

const sortProjects = (projects: Project[], sortBy: string, sortOrder: string) => {
	switch (sortBy) {
		case 'Alphabetical':
			return sortAlphabetical(projects, sortOrder);
		case 'Featured':
			return sortFeatured(projects, sortOrder);
		default:
			return sortAlphabetical(projects, sortOrder);
	}
};

const filterFeatured = (projects: Project[]) => {
	return projects.filter((project) => project.metadata.featured);
};

const filterTags = (projects: Project[], tags: MultiselectOptions) => {
	return projects.filter((project) => {
		// Filter Tags
		const currentTags = Object.keys(tags).filter((key) => tags[key]);
		const projectInTags = currentTags.every((tag) => project.metadata.tags.includes(tag));
		return projectInTags;
	});
};

const filterTypes = (projects: Project[], types: MultiselectOptions) => {
	return projects.filter((project) => {
		// Filter types
		const currentTypes = Object.keys(types).filter((key) => types[key]);
		const projectInTypes = currentTypes.includes(project.metadata.type);
		return projectInTypes;
	});
};

const filterProjects = (
	projects: Project[],
	show: string,
	tags: MultiselectOptions,
	types: MultiselectOptions
) => {
	let projectsFiltered = projects;

	const shouldFilterFeatured = show == 'Featured Only';
	projectsFiltered = shouldFilterFeatured ? filterFeatured(projectsFiltered) : projectsFiltered;

	const shouldFilterTags = !Object.values(tags).every((tag) => !tag);
	projectsFiltered = shouldFilterTags ? filterTags(projectsFiltered, tags) : projectsFiltered;

	const shouldFilterTypes = !Object.values(types).every((type) => !type);
	projectsFiltered = shouldFilterTypes ? filterTypes(projectsFiltered, types) : projectsFiltered;

	return projectsFiltered;
};

export default function FilterAndSortProjects(
	projects: Projects,
	show: string,
	tags: MultiselectOptions,
	types: MultiselectOptions,
	sortBy: string,
	sortOrder: string
) {
	let projectsToRender = Object.values(projects);
	projectsToRender = sortProjects(projectsToRender, sortBy, sortOrder);
	projectsToRender = filterProjects(projectsToRender, show, tags, types);

	return projectsToRender;
}
