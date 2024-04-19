import './footer.scss';

export default function Footer() {
	return (
		<div id='footer'>
			<div id='footer-copyright'>{new Date().getFullYear()} © Nick Cunningham</div>
		</div>
	);
}
