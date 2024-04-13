import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDocker, faGithub } from '@fortawesome/free-brands-svg-icons';
import {
	faCaretUp,
	faCaretDown,
	faTag,
	faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';

import { Project } from 'src/types/project';

import './project-card.scss';
// import { metadata } from 'src/projects/portfolio/25+5-clock.mdx';

const linkLookup = {
	live: { icon: faUpRightFromSquare, label: 'View Live' },
	github: { icon: faGithub, label: 'View Source Code' },
	codespace: { icon: faDocker, label: 'Open in Github Codespace' },
};

export default function ProjectCard({ project }: { project: Project }) {
	const href = project.metadata.links['github'];

	const [isExpanded, setExpanded] = useState(false);

	const toggleQuicklinks = () => {
		setExpanded(!isExpanded);
	};

	const ProjectImage = () => {
		return (
			<a className='project-image' href={href} target='_blank'>
				<img className='project-image' src={project.metadata.thumb} alt='' />
			</a>
		);
	};

	const ProjectTitle = () => {
		return (
			<h3 className='project-name'>
				<a href={href} target='_blank'>
					{project.metadata.name}
				</a>
			</h3>
		);
	};

	const ProjectDescription = () => {
		if (project.metadata.description) {
			return <p className='project-description'>{project.metadata.description}</p>;
		} else {
			if (!isExpanded) {
				return <Tags />;
			}
		}
	};

	const Dropdown = () => {
		return (
			<div className='project-quicklink-dropdown' onClick={toggleQuicklinks}>
				<span className='quicklink-label'>{isExpanded ? 'See Less' : 'See More'}</span>
				{isExpanded ? (
					<FontAwesomeIcon icon={faCaretUp} />
				) : (
					<FontAwesomeIcon icon={faCaretDown} />
				)}
			</div>
		);
	};

	const Tags = () => {
		// console.log(projectTags);
		const tagsSorted = project.metadata.tags.sort((a, b) => {
			const after = a.toLowerCase() > b.toLowerCase();
			const before = a.toLowerCase() < b.toLowerCase();

			return after ? 1 : before ? -1 : 0;
		});
		return (
			<div className='project-tags'>
				{tagsSorted.map((tag: string) => {
					return (
						<span className='project-tag'>
							<FontAwesomeIcon className='tag-icon' icon={faTag} />
							<span className='tag-label'>{tag}</span>
						</span>
					);
				})}
			</div>
		);
	};

	const Quicklinks = () => {
		return (
			<div className='project-quicklinks'>
				{Object.entries(project.metadata.links).map((entry) => {
					const link: string = entry[1];
					const linkData: object = linkLookup[entry[0]];
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

	const ProjectDetails = () => {
		if (isExpanded) {
			return (
				<div className='project-more-info'>
					<h5>Tags</h5>
					<Tags />
					<h5>Links</h5>
					<Quicklinks />
				</div>
			);
		}
	};

	return (
		<div className='project-card elevated'>
			<ProjectImage />
			<div className='project-info'>
				<ProjectTitle />
				<ProjectDescription />
				<ProjectDetails />
			</div>
			<Dropdown />
		</div>
	);
}
