import './projects.scss';
import ProjectCard from '../../components/project-card/project-card';

export default function Projects() {
	const projects = import.meta.glob('/src/projects/portfolio/*.mdx', { eager: true });
	console.log(projects);

	return (
		<div>
			<h1>Projects</h1>
			<div id='project-browser'>
				<div id='projects'>
					{Object.values(projects).map((project) => {
						return (
							<ProjectCard
								projectName={project.projectName}
								projectThumb={project.projectThumb}
								projectLinks={project.projectLinks}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
