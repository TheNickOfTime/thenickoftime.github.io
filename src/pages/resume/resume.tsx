import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import './resume.scss';

export default function Resume() {
	return (
		<div id='resume'>
			<div id='resume-container'>
				<div id='resume-download'>
					<a className='button' href='/documents/nick-cunningham-resume.pdf' download>
						<FontAwesomeIcon icon={faFilePdf} />
						<span>Download</span>
					</a>
				</div>
				<embed
					id='pdf-container'
					src='/documents/nick-cunningham-resume.pdf#toolbar=0&view=fitv'
				/>
				<a href='/documents/nick-cunningham-resume.pdf' download>
					<img id='resume-img' src='/documents/nick-cunningham-resume.jpg' alt='Resume' />
				</a>
			</div>
		</div>
	);
}
