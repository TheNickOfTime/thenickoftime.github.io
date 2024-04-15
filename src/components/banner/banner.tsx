import { PropsWithChildren, useState } from 'react';
// import {Element} from 'JSX'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import './banner.scss';

export default function Banner({ children }: PropsWithChildren) {
	const [isOpen, setIsOpen] = useState(true);

	if (isOpen) {
		return (
			<div id='banner'>
				<div id='banner-background' />
				<div id='banner-main'>
					<p id='banner-text'>{children}</p>
					<FontAwesomeIcon
						id='banner-button'
						icon={faXmark}
						onClick={() => setIsOpen(false)}
					/>
				</div>
			</div>
		);
	}
}
