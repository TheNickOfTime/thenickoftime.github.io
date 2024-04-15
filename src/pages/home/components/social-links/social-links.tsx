import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import './social-links.scss';

interface LinkMetadata {
	label: string;
	link: string;
	icon: IconDefinition;
}

interface LinkData {
	[index: string]: LinkMetadata;
}

export default function SocialLinks() {
	const links: LinkData = {
		github: {
			label: 'GitHub',
			link: 'https://github.com/TheNickOfTime',
			icon: faGithub,
		},
		linkedin: {
			label: 'LinkedIn',
			link: 'https://www.linkedin.com/in/nickecunningham/',
			icon: faLinkedin,
		},
	};

	const SocialLink = ({ id, metadata }: { id: string; metadata: LinkMetadata }) => {
		return (
			<a className='social-link' id={id} href={metadata.link} target='_blank'>
				<FontAwesomeIcon id='icon' icon={metadata.icon} />
				<span id='label'>{metadata.label}</span>
			</a>
		);
	};

	return (
		<div id='social-links'>
			{Object.keys(links).map((key) => (
				<SocialLink id={key} metadata={links[key]} />
			))}
		</div>
	);
}
