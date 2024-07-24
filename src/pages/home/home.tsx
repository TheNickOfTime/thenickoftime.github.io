import Hero from 'src/components/home/hero/hero';
import SocialLinks from 'src/components/home/social-links/social-links';
import FeaturedProjects from 'src/components/home/featured/featured-projects';

import './home.scss';

export default function Home() {
	return (
		<>
			<Hero />
			<SocialLinks />
			<FeaturedProjects
				title='Featured Web Projects'
				projects={[
					'/src/projects/portfolio/handbrake-web.mdx',
					'/src/projects/portfolio/dev-portfolio.mdx',
					'/src/projects/portfolio/games-portfolio.mdx',
					'/src/projects/portfolio/pokemon-search-app.mdx',
					'/src/projects/portfolio/realtime-multiplayer-game.mdx',
					'/src/projects/portfolio/rock-paper-scissors.mdx',
				]}
			/>
			<FeaturedProjects
				title='Featured Game Projects'
				projects={[
					'/src/projects/portfolio/thorb.mdx',
					'/src/projects/portfolio/dungeon-of-greyness.mdx',
					'/src/projects/portfolio/escape-room.mdx',
					'/src/projects/portfolio/gravity-box.mdx',
				]}
			/>
		</>
	);
}
