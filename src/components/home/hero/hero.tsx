import './hero.scss';

export default function Hero() {
	return (
		<div id='hero'>
			<div id='hero-background' />
			<div id='hero-foreground'>
				<div id='hero-text'>
					<div id='primary'>Hello there!</div>
					<div id='secondary'>I'm Nick, a Developer.</div>
				</div>
				<div id='hero-image'>
					<img
						src='/profile/profile_transparent.png'
						alt='hero-portrait'
						loading='eager'
					/>
				</div>
			</div>
		</div>
	);
}
