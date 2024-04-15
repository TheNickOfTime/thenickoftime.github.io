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
import Banner from './components/banner/banner';
import Navigation from './components/navigation/navigation';

// Pages
import Home from './pages/home/home.mdx';
import Projects from './pages/projects/projects.mdx';
import Error404 from './pages/error/404.mdx';

// Test pages
import MarkdownTest from './pages/test/markdown/markdown';
import StyleTest from './pages/test/style/style';
import Header from './components/header/header';
import Footer from './components/footer/footer';

// App ---------------------------------------------------------------------------------------------
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Banner>
			Warning: This page is under active development. See development{' '}
			<a
				href='https://github.com/TheNickOfTime/thenickoftime.github.io/tree/dev'
				target='_blank'
			>
				here
			</a>
			. Currently mobile is unsupported.
		</Banner>
		<main>
			<Router>
				<Header />
				<Routes>
					<Route path='/' element={<Navigation />}>
						{/* Index Page */}
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
							path='projects'
							element={
								<div className='content' id='projects'>
									<Projects />
								</div>
							}
						/>
						{/* Test Pages */}
						{/* <Route path='markdown-test' element={<MarkdownTest />} />
						<Route path='style-test' element={<StyleTest />} /> */}
						<Route path='*' element={<Error404 id='error-404' />} />
					</Route>
				</Routes>
				<Footer />
			</Router>
		</main>
	</React.StrictMode>
);
