import Hero from 'src/components/home/hero/hero';
import SocialLinks from 'src/components/home/social-links/social-links';
import FeaturedProjects from 'src/components/home/featured/featured-projects';

import './home.scss';

export default function Home() {
	return (
		<>
			<Hero />
			<SocialLinks />
			<FeaturedProjects />
		</>
	);
}
