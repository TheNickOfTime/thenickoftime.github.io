import './hero.scss';

export default function Hero() {
	return (
		<div id='hero'>
			<div id='hero-background' />
			<img id='hero-image' src='/hero.png' alt='hero-portrait' />
			<div id='hero-foreground'>
				<div id='inner'>
					<div id='primary'>Hello there!</div>
					<div id='secondary'>I'm Nick, a Developer.</div>
				</div>
			</div>
		</div>
	);
}
