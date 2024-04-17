import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	IconDefinition,
	faFreeCodeCamp,
	faGithub,
	faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

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
		freecodecamp: {
			label: 'freeCodeCamp',
			link: 'https://www.freecodecamp.org/thenickoftime',
			icon: faFreeCodeCamp,
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
