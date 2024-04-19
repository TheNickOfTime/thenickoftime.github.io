import { NavLink } from 'react-router-dom';
import './header.scss';

export default function Header() {
	return (
		<div id='header'>
			<h1 id='header-title'>
				<NavLink to='/'>Nick Cunningham</NavLink>
			</h1>
			<h5 id='header-subtitle'>Developer</h5>
		</div>
	);
}
