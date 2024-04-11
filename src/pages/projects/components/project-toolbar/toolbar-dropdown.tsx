import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import './toolbar-dropdown.scss';

// Types -------------------------------------------------------------------------------------------
interface Params {
	label: string;
	icon: IconDefinition;
	options: { [index: string]: boolean };
	setOptions: React.Dispatch<React.SetStateAction<{ [index: string]: boolean }>>;
}

// Component ---------------------------------------------------------------------------------------
export default function ToolbarDropdown({ label, icon, options, setOptions }: Params) {
	// const context = useContext(ProjectBrowserContext);

	const localOptions = { ...options };

	const [renderList, setRenderList] = useState(false);

	const toggleDropdown = () => {
		setRenderList(!renderList);
	};

	const toggleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
		const optionName: string = event.target.value;
		localOptions[optionName] = !localOptions[optionName];
		setOptions(localOptions);
	};

	const DropdownOption = ({ optionName }: { optionName: string }) => {
		return (
			<div className='dropdown-option' id={optionName}>
				<input
					type='checkbox'
					id={optionName}
					value={optionName}
					checked={localOptions[optionName]}
					onChange={toggleCheckbox}
				/>
				<span> {optionName}</span>
			</div>
		);
	};

	const DropdownList = () => {
		if (renderList) {
			return (
				<div className='dropdown-list'>
					{Object.keys(options).map((option: string) => (
						<DropdownOption optionName={option} key={option} />
					))}
				</div>
			);
		}
	};

	return (
		<div className='toolbar-dropdown'>
			<button className='dropdown-button' onClick={toggleDropdown}>
				<FontAwesomeIcon className='dropdown-icon' icon={icon} />
				<span className='dropdown-label'>{label}</span>
				<FontAwesomeIcon
					className='dropdown-arrow'
					icon={renderList ? faCaretUp : faCaretDown}
				/>
			</button>
			<DropdownList />
		</div>
	);
}
