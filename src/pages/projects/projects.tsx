import './projects.scss';
import { ProjectBrowser } from './components/project-browser/project-browser';

export default function Projects() {
	return (
		<div>
			<h1>Projects</h1>
			<p>
				Below you will find a list of <em>all</em> of the projects I have worked on, big &
				small. For your convenience, please use the filtering and sorting options 😊.
			</p>
			<br />
			<ProjectBrowser />
		</div>
	);
}
