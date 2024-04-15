import './footer.scss';

export default function Footer() {
	return (
		<div id='footer'>
			{/* <div id='footer-main'>
				<div id='footer-hero'>
					<img src='/hero.png' alt='Footer Hero' />
				</div>
			</div> */}
			<div id='footer-copyright'>{new Date().getFullYear()} © Nick Cunningham</div>
		</div>
	);
}
