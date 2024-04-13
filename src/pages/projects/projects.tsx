import './projects.scss';
import { ProjectBrowser } from './components/project-browser/project-browser';

export default function Projects() {
	return (
		<div>
			<h1>Projects</h1>
			<p>
				Below lies <strong>the project browser</strong>. By default it will show a limited
				number of featured projects I want to highlight - if you're not seeing what you
				want, please use the <em>filters</em> and <em>sorting</em> options to see more!
			</p>
			<br />
			<ProjectBrowser />
		</div>
	);
}
