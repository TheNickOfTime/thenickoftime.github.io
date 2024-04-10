import { NavLink, Outlet } from 'react-router-dom';
import './navigation.scss';

export default function Navigation() {
	const navEntries = {
		Home: '/',
		Projects: '/projects',
	};

	return (
		<>
			<nav id='navigation'>
				<ul>
					{Object.entries(navEntries).map((entry) => {
						return (
							<li>
								<NavLink to={entry[1]}>{entry[0]}</NavLink>
							</li>
						);
					})}
				</ul>
			</nav>

			{/* Renders the current route */}
			<Outlet />
		</>
	);
}
