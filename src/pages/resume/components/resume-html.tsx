import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

import Header from 'src/components/header/header';

import YAML from 'yaml';
import './resume.scss';
import resumeData from './resume-data.yaml?raw';

interface ResumeData {
	title: string;
	subtitle: string;
	links: { [index: string]: string }[];
	skills: { [index: string]: string[] };
	experience: {
		company: string;
		title: string;
		period: string;
		responsibilities: string[];
	}[];
	education: {
		school: string;
		period: string;
		degree?: string;
		certifications?: string[];
	}[];
}

export default function ResumeHTML() {
	const data: ResumeData = YAML.parse(resumeData);

	const ResumeContainer = () => {
		const Profile = () => {
			return (
				<div id='profile-container'>
					<img src='profile/profile_transparent.png' alt='profile' />
				</div>
			);
		};

		const Links = () => {
			const icons: { [indexl: string]: IconDefinition } = {
				email: faEnvelope,
				github: faGithub,
				linkedin: faLinkedin,
				portfolio: faUser,
			};

			return (
				<div id='links-container'>
					<h3>Links</h3>
					<ul id='link-list'>
						{data.links.map((link) => (
							<li className='link-entry' id={link.id}>
								<FontAwesomeIcon id='icon' icon={icons[link.id]} />
								<a id='link' href={link.link}>
									{link.display}
								</a>
							</li>
						))}
					</ul>
				</div>
			);
		};

		const Skills = () => {
			return (
				<div id='skills-container'>
					<h3 id='skills-title'>Skills</h3>
					<div id='skill-categories'>
						{Object.keys(data.skills).map((category) => (
							<div id={category + '-skills'}>
								<h5>{category}</h5>
								<ul className='skills-list'>
									{data.skills[category]
										.sort((a, b) =>
											a.toLowerCase() > b.toLowerCase()
												? 1
												: a.toLowerCase() < b.toLowerCase()
												? -1
												: 0
										)
										.map((skill) => (
											<li>{skill}</li>
										))}
								</ul>
							</div>
						))}
					</div>
				</div>
			);
		};

		const Experience = () => {
			return (
				<div id='experience-container'>
					<h2 id='title'>Experience</h2>
					{data.experience.map((entry) => (
						<div className='experience-entry'>
							<h3 id='title'>{entry.title}</h3>
							<div id='company-period'>
								<h5>{entry.company}</h5>
								<p>{entry.period}</p>
							</div>
							<div id='responsibilities'>
								<ul>
									{entry.responsibilities.map((responsibility) => (
										<li>{responsibility}</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			);
		};

		const Education = () => {
			return (
				<div id='education-container'>
					<h2>Education</h2>
					{data.education.map((entry) => (
						<div className='education-entry'>
							<div id='school-period'>
								<h3>{entry.school}</h3>
								<p>{entry.period}</p>
							</div>
							{entry.degree && (
								<div className='degree'>
									<p>{entry.degree}</p>
								</div>
							)}
							{entry.certifications && (
								<div className='certifications-list'>
									<p>Certifications:</p>
									<ul>
										{entry.certifications.map((cert) => (
											<li>{cert}</li>
										))}
									</ul>
								</div>
							)}
						</div>
					))}
				</div>
			);
		};

		return (
			<div id='resume-container'>
				<div id='column-one'>
					<Profile />
					<Links />
					<Skills />
				</div>
				<div id='column-two'>
					<Header />
					<Experience />
					<Education />
				</div>
			</div>
		);
	};

	return <ResumeContainer />;
}
