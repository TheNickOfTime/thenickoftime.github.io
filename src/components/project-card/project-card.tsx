import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDocker, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCaretUp, faCaretDown, faTag } from '@fortawesome/free-solid-svg-icons';
import './project-card.scss';

const linkLookup = {
	github: { icon: faGithub, label: 'View Source Code' },
	codespace: { icon: faDocker, label: 'Open in Github Codespace' },
};

export default function ProjectCard({
	projectName,
	projectThumb,
	projectLinks,
	projectTags,
}: {
	projectName: string;
	projectThumb: string;
	projectLinks: object;
	projectTags: [string];
}) {
	const [isExpanded, setExpanded] = useState(false);

	const toggleQuicklinks = () => {
		setExpanded(!isExpanded);
	};

	const renderTags = () => {
		// console.log(projectTags);
		return (
			<div className='project-tags'>
				{projectTags.map((tag: string) => {
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

	const renderQuicklinks = () => {
		return (
			<div className='project-quicklinks'>
				{Object.entries(projectLinks).map((entry) => {
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

	const renderDropdown = () => {
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

	const renderMore = () => {
		return (
			<div className='project-more-info'>
				<h5>Tags</h5>
				{renderTags()}
				<h5>Links</h5>
				{renderQuicklinks()}
			</div>
		);
	};

	return (
		<div className='project-card elevated'>
			<img className='project-image' src={projectThumb} alt='' />
			<div className='project-info'>
				<h3 className='project-name'>{projectName}</h3>
				<p className='project-description'>This is a description for a project.</p>
				{isExpanded && renderMore()}
			</div>
			{renderDropdown()}
		</div>
	);
}
