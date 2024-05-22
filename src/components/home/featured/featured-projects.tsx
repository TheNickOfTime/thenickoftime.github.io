import { NavLink } from 'react-router-dom';
import { Project, Projects } from 'src/types/project';

import ProjectCard from '../../projects/project-card/project-card';
import './featured-projects.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Gallery = () => {
	const projects: Projects = import.meta.glob('/src/projects/portfolio/*.mdx', {
		eager: true,
	});

	const featuredProjects: Project[] = Object.values(projects)
		.filter((project) => {
			return project.metadata.featured;
		})
		.sort((a, b) => a.metadata.featured - b.metadata.featured);

	const [galleryIndex, setGalleryIndex] = useState(0);

	const handleButtonClick = (direction: number) => {
		const newIndex = Math.min(
			Math.max(galleryIndex + direction, 0),
			featuredProjects.length - 1
		);

		setGalleryIndex(newIndex);
	};

	const handleBulletClick = (newIndex: number) => {
		setGalleryIndex(newIndex);
	};

	return (
		<div id='gallery-container'>
			<div className='gallery-button' id='previous'>
				<button onClick={() => handleButtonClick(-1)}>
					<FontAwesomeIcon icon={faCaretLeft} size='2x' />
				</button>
			</div>
			<div id='gallery'>
				<div id='gallery-cards'>
					{featuredProjects.map((project, index) => (
						<div
							className={`card-container ${
								index == galleryIndex - 1
									? 'previous'
									: index == galleryIndex
									? 'primary'
									: index == galleryIndex + 1
									? 'secondary'
									: index == galleryIndex + 2
									? 'next'
									: 'hidden'
							}`}
						>
							<ProjectCard project={project.metadata} />
						</div>
					))}
				</div>
				<div id='gallery-bullets'>
					{featuredProjects.map((_, index) => (
						<FontAwesomeIcon
							className={index == galleryIndex ? 'current' : ''}
							icon={faCircle}
							size='2xs'
							onClick={() => handleBulletClick(index)}
						/>
					))}
				</div>
			</div>
			<div className='gallery-button' id='next'>
				<button onClick={() => handleButtonClick(1)}>
					<FontAwesomeIcon icon={faCaretRight} size='2x' />
				</button>
			</div>
		</div>
	);
};

export default function FeaturedProjects() {
	return (
		<div id='featured-projects'>
			<div id='projects-title'>
				<h1>Featured Projects</h1>
				<NavLink id='all-projects' className='button' to='/projects'>
					See All Projects
				</NavLink>
			</div>
			{/* <div id='projects-container'> */}
			<Gallery />
			{/* </div> */}
		</div>
	);
}
