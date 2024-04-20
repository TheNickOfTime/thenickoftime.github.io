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
import Banner from './components/index/banner/banner';
import Navigation from './components/index/navigation/navigation';

// Pages
import Home from './pages/home/home.mdx';
import Projects from './pages/projects/projects.mdx';
import Error404 from './pages/error/404.mdx';

// Test pages
// import MarkdownTest from './pages/test/markdown/markdown';
// import StyleTest from './pages/test/style/style';
import Header from './components/index/header/header';
import Footer from './components/index/footer/footer';
import Resume from './pages/resume/resume';

// App ---------------------------------------------------------------------------------------------
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<main>
			<Banner>
				This page is under active development. See development{' '}
				<a
					href='https://github.com/TheNickOfTime/thenickoftime.github.io/tree/dev'
					target='_blank'
				>
					here
				</a>
				.
			</Banner>
			<Router>
				<Header />
				<Navigation />
				<Routes>
					<Route
						index
						element={
							<div className='content' id='home'>
								<Home />
							</div>
						}
					/>
					{/* Main Pages */}
					<Route
						path='/projects'
						element={
							<div className='content' id='projects'>
								<Projects />
							</div>
						}
					/>
					<Route
						path='/resume'
						element={
							<div className='content' id='resume'>
								<Resume />
							</div>
						}
					/>
					<Route path='/*' element={<Error404 id='error-404' />} />
				</Routes>
				<Footer />
			</Router>
		</main>
	</React.StrictMode>
);
