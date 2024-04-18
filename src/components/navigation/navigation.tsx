import { NavLink, Outlet } from 'react-router-dom';
import './navigation.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

export default function Navigation() {
	const navEntries = {
		Home: '/',
		Projects: '/projects',
		Resume: '/resume',
	};

	const [currentPage, setCurrentPage] = useState(Object.keys(navEntries)[0]);
	const [isExpanded, setIsExpanded] = useState(false);

	const NavigationButton = () => {
		return (
			<button
				id='navigation-button'
				className={isExpanded ? 'expanded' : ''}
				onClick={() => setIsExpanded(!isExpanded)}
			>
				<span>{currentPage}</span>
				<FontAwesomeIcon icon={isExpanded ? faCaretUp : faCaretDown} />
			</button>
		);
	};

	const NavigationLinks = () => {
		return (
			<ul id='navigation-links'>
				{Object.entries(navEntries).map((entry) => {
					return (
						<li
							key={entry[0].toLowerCase()}
							className={entry[0] == currentPage ? 'selected' : ''}
						>
							<NavLink
								className='navigation-link'
								to={entry[1]}
								onClick={() => {
									setCurrentPage(entry[0]);
									setIsExpanded(false);
								}}
							>
								{entry[0]}
							</NavLink>
						</li>
					);
				})}
			</ul>
		);
	};

	return (
		<>
			<nav id='navigation'>
				<div id='navigation-standard' className='navigation-container'>
					<NavigationLinks />
				</div>
				<div id='navigation-mobile' className='navigation-container'>
					<NavigationButton />
					{isExpanded && <NavigationLinks />}
				</div>
			</nav>

			{/* Renders the current route */}
			<Outlet />
		</>
	);
}
