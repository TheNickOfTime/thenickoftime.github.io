import { useState } from 'react';
import { ProjectMetadata } from 'src/types/project';

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDocker, faGithub } from '@fortawesome/free-brands-svg-icons';
import {
	faCaretUp,
	faCaretDown,
	faTag,
	faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';

import './project-card.scss';

interface LinkMetadata {
	icon: IconDefinition;
	label: string;
}

interface LinkData {
	[index: string]: LinkMetadata;
}

const linkLookup: LinkData = {
	live: { icon: faUpRightFromSquare, label: 'View Live' },
	github: { icon: faGithub, label: 'View Source Code' },
	codespace: { icon: faDocker, label: 'Open in Github Codespace' },
};

// Sub-components ----------------------------------------------------------------------------------
const ProjectImage = ({ href, thumbnail }: { href: string; thumbnail: string }) => {
	return (
		<a className='project-image' href={href} target='_blank'>
			<img className='project-image' src={thumbnail} alt='' />
		</a>
	);
};

const ProjectTitle = ({ href, title }: { href: string; title: string }) => {
	return (
		<h3 className='project-name'>
			<a href={href} target='_blank'>
				{title}
			</a>
		</h3>
	);
};

const ProjectDescription = ({ description }: { description: string }) => {
	return <p className='project-description'>{description}</p>;
};

const Tags = ({ tags }: { tags: string[] }) => {
	// console.log(projectTags);
	const tagsSorted = tags.sort((a, b) => {
		const after = a.toLowerCase() > b.toLowerCase();
		const before = a.toLowerCase() < b.toLowerCase();

		return after ? 1 : before ? -1 : 0;
	});
	return (
		<div className='project-tags'>
			{tagsSorted.map((tag: string) => {
				return (
					<span className='project-tag' key={tag}>
						<FontAwesomeIcon className='tag-icon' icon={faTag} />
						<span className='tag-label'>{tag}</span>
					</span>
				);
			})}
		</div>
	);
};

const Quicklinks = ({ links }: { links: { [index: string]: string } }) => {
	return (
		<div className='project-quicklinks'>
			{Object.entries(links).map((entry) => {
				const link = entry[1];
				const linkData = linkLookup[entry[0]];
				// console.log(linkData);
				return (
					<a className='button quicklink-button' href={link} target='_blank'>
						<FontAwesomeIcon className='quicklink-icon' icon={linkData.icon} />
						<span className='quicklink-label'>{linkData.label}</span>
					</a>
				);
			})}
		</div>
	);
};

const Dropdown = ({ isExpanded, onClick }: { isExpanded: boolean; onClick: () => void }) => {
	return (
		<button className='project-quicklink-dropdown' onClick={onClick}>
			<span className='quicklink-label'>{isExpanded ? 'See Less' : 'See More'}</span>
			{isExpanded ? (
				<FontAwesomeIcon icon={faCaretUp} />
			) : (
				<FontAwesomeIcon icon={faCaretDown} />
			)}
		</button>
	);
};

// Main components ---------------------------------------------------------------------------------
export default function ProjectCard({ project }: { project: ProjectMetadata }) {
	const href = project.links['github'];

	const [isExpanded, setExpanded] = useState(false);

	const toggleQuicklinks = () => {
		setExpanded(!isExpanded);
	};

	return (
		<div className='project-card elevated'>
			<ProjectImage href={href} thumbnail={project.thumb} />
			<div className='project-info'>
				<ProjectTitle href={href} title={project.name} />
				{project.description ? (
					<ProjectDescription description={project.description} />
				) : isExpanded ? null : (
					<Tags tags={project.tags} />
				)}
				<div id='project-more-info' className={isExpanded ? 'expanded' : 'collapsed'}>
					<h5>Tags</h5>
					<Tags tags={project.tags} />
					<h5>Links</h5>
					<Quicklinks links={project.links} />
				</div>
			</div>
			<Dropdown isExpanded={isExpanded} onClick={toggleQuicklinks} />
		</div>
	);
}
