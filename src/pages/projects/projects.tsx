import './projects.scss'
import ProjectCard from "../../components/project-card/project-card"

export default function Projects() {

	const projects = [
		'Project 1',
		'Project 2',
		'Project 3'
	]

	return (
		<div>
			<h1>Projects</h1>
			<div id='project-browser'>
				<div id='projects'>
					{projects.map((project) => {
						return <ProjectCard project={project} />
					})}
				</div>
			</div>
		</div>
	)
}