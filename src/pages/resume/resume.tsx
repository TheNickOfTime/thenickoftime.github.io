import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import './resume.scss';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.js',
	import.meta.url
).toString();

export default function Resume() {
	return (
		<div id='resume'>
			{/* <h1>Resume</h1> */}
			<div id='resume-container'>
				<div id='resume-download'>
					<a className='button' href='/documents/nick-cunningham-resume.pdf' download>
						{/* <FontAwesomeIcon icon={faDownload} /> */}
						<FontAwesomeIcon icon={faFilePdf} />
						<span>Download</span>
					</a>
				</div>
				{/* <ResumeContainer /> */}
				<div id='pdf-container'>
					<Document file='/documents/nick-cunningham-resume.pdf'>
						<Page pageNumber={1} scale={1.5} />
					</Document>
				</div>
				<embed
					id='pdf-embed'
					src='/documents/nick-cunningham-resume.pdf'
					type='application/pdf'
				/>
			</div>
		</div>
	);
}
