import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDocker, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import './project-card.scss'

export default function ProjectCard({project}: {project: string}) {
	const [isExpanded, setExpanded] = useState(false);

	const toggleQuicklinks = () => {
		setExpanded(!isExpanded);
	}

	const renderQuicklinks = () => {
		return (
			<div className='project-quicklinks' >
				<button className='quicklink-button'>
					<FontAwesomeIcon className='quicklink-icon' icon={faGithub} />
					<span className='quicklink-label'>View Source Code</span>
				</button>
				<button className='quicklink-button'>
					<FontAwesomeIcon className='quicklink-icon' icon={faDocker} />
					<span className='quicklink-label'>Open in GitHub Codespace</span>
				</button>
			</div>
		)
	}

	const renderDropdown = () => {
		return (
			<div className='project-quicklink-dropdown' onClick={toggleQuicklinks}>
				<span className='quicklink-label'>{isExpanded ? 'See Less' : 'See More'}</span>
				{isExpanded ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
			</div>
		)
	}

	return (
		<div className="project-card elevated">
			<img className='project-image' src="/thumbs/portfolio/choropleth-map.png" alt="" />
			<div className='project-info'>
				<h3 className='project-name'>{project}</h3>
				<p className='project-description'>This is a description for a project.</p>
			</div>
			{isExpanded && renderQuicklinks()}
			{renderDropdown()}
		</div>
	)
}