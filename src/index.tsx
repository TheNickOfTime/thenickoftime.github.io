// Dependencies ------------------------------------------------------------------------------------

// React
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Styles
import './global.scss';
import '@fontsource-variable/darker-grotesque';
import '@fontsource-variable/victor-mono';
import '@fontsource/material-icons';
import '@fortawesome/react-fontawesome';

//Components
import Navigation from './components/navigation/navigation';

// Pages
import Home from './pages/home/home';
import Projects from './pages/projects/projects';
import MissingError from './pages/error/404/404';

// Test pages
import MarkdownTest from './pages/test/markdown/markdown';
import StyleTest from './pages/test/style/style';

// App ---------------------------------------------------------------------------------------------
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<main>
			<Router>
				<Routes>
					<Route path='/' element={<Navigation />}>
						{/* Index Page */}
						<Route index element={<Home />} />
						{/* Main Pages */}
						<Route path='projects' element={<Projects />} />
						{/* Test Pages */}
						<Route path='markdown-test' element={<MarkdownTest />} />
						<Route path='style-test' element={<StyleTest />} />
						<Route path='*' element={<MissingError />} />
					</Route>
				</Routes>
			</Router>
		</main>
	</React.StrictMode>
);
