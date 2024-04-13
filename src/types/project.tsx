import { MDXContent } from 'mdx/types';

export interface ProjectMetadata {
	name: string;
	thumb: string;
	links: { [index: string]: string };
	tags: string[];
	featured: number;
	type: string;
}

export interface Project {
	default: MDXContent;
	metadata: ProjectMetadata;
}

export interface Projects {
	[key: string]: Project;
}

export interface MultiselectOptions {
	[index: string]: boolean;
}
