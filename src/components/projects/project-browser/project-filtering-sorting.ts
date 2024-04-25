import { MultiselectOptions, ProjectMetadata } from 'src/types/project';

const sortAlphabetical = (projects: ProjectMetadata[], sortOrder: string) => {
	const sortedProjects = projects.sort((a, b) => {
		const after = a.name.toLowerCase() > b.name.toLowerCase();
		const before = a.name.toLowerCase() < b.name.toLowerCase();

		return after ? 1 : before ? -1 : 0;
	});

	return sortOrder == 'Descending' ? sortedProjects : sortedProjects.reverse();
};

const sortFeatured = (projects: ProjectMetadata[], sortOrder: string) => {
	const sortedProjects = sortAlphabetical(projects, sortOrder).sort((a, b) => {
		const aRank = a.featured ? a.featured : Infinity;
		const bRank = b.featured ? b.featured : Infinity;

		return aRank - bRank;
	});

	return sortedProjects;
};

const sortProjects = (projects: ProjectMetadata[], sortBy: string, sortOrder: string) => {
	switch (sortBy) {
		case 'Alphabetical':
			return sortAlphabetical(projects, sortOrder);
		case 'Featured':
			return sortFeatured(projects, sortOrder);
		default:
			return sortAlphabetical(projects, sortOrder);
	}
};

const filterFeatured = (projects: ProjectMetadata[]) => {
	return projects.filter((project) => project.featured);
};

const filterTags = (projects: ProjectMetadata[], tags: MultiselectOptions) => {
	return projects.filter((project) => {
		// Filter Tags
		const currentTags = Object.keys(tags).filter((key) => tags[key]);
		const projectInTags = currentTags.every((tag) => project.tags.includes(tag));
		return projectInTags;
	});
};

const filterTypes = (projects: ProjectMetadata[], types: MultiselectOptions) => {
	return projects.filter((project) => {
		// Filter types
		const currentTypes = Object.keys(types).filter((key) => types[key]);
		const projectInTypes = currentTypes.includes(project.type);
		return projectInTypes;
	});
};

const filterProjects = (
	projects: ProjectMetadata[],
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
	projects: ProjectMetadata[],
	show: string,
	tags: MultiselectOptions,
	types: MultiselectOptions,
	sortBy: string,
	sortOrder: string
) {
	let projectsToRender = projects;
	projectsToRender = sortProjects(projectsToRender, sortBy, sortOrder);
	projectsToRender = filterProjects(projectsToRender, show, tags, types);

	return projectsToRender;
}
