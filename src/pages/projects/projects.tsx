import './projects.scss';
import { ProjectBrowser } from './components/project-browser/project-browser';

export default function Projects() {
	return (
		<div>
			<h1>Projects</h1>
			<ProjectBrowser />
		</div>
	);
}
