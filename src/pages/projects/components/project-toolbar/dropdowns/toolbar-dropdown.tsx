import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import ToolbarDropdownSingleselect from './toolbar-dropdown-singleselect';
import ToolbarDropdownMultiselect from './toolbar-dropdown-multiselect';
import './toolbar-dropdown.scss';

// Types -------------------------------------------------------------------------------------------
interface Params {
	label: string;
	icon: IconDefinition;
	multiselect?: boolean;
	multiselectOptions?: { [index: string]: boolean };
	setMultiselectOptions?: React.Dispatch<React.SetStateAction<{ [index: string]: boolean }>>;
	singleselectOptions?: string[];
	selectedOption?: string;
	setSingleselectOption?: React.Dispatch<React.SetStateAction<string>>;
}

// Component ---------------------------------------------------------------------------------------
export default function ToolbarDropdown({
	label,
	icon,
	multiselect = true,
	multiselectOptions,
	setMultiselectOptions,
	singleselectOptions,
	selectedOption,
	setSingleselectOption,
}: Params) {
	// const context = useContext(ProjectBrowserContext);

	const [renderList, setRenderList] = useState(false);

	const toggleDropdown = () => {
		setRenderList(!renderList);
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
			{renderList &&
				(multiselect ? (
					<ToolbarDropdownMultiselect
						options={multiselectOptions!}
						setOptions={setMultiselectOptions!}
					/>
				) : (
					<ToolbarDropdownSingleselect
						options={singleselectOptions!}
						selectedOption={selectedOption!}
						setSelectedOption={setSingleselectOption!}
					/>
				))}
		</div>
	);
}
