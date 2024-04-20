/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import './toolbar-dropdown.scss';
import { ToolbarContext } from '../project-toolbar/projects-toolbar-context';
// import { ProjectBrowserContext } from '../project-browser/project-browser-context';
// import { string } from 'node_modules/yaml/dist/schema/common/string';

// Types -------------------------------------------------------------------------------------------
interface Params {
	label: string;
	icon: IconDefinition;
	options: string[];
	selectedOptions: string | { [index: string]: boolean };
	setSelectedOptions: React.Dispatch<React.SetStateAction<any>>;
	// | React.Dispatch<React.SetStateAction<string>>
	// | React.Dispatch<React.SetStateAction<{ [index: string]: boolean }>>;
}

// Component ---------------------------------------------------------------------------------------
export default function ToolbarDropdown({
	label,
	icon,
	options,
	selectedOptions,
	setSelectedOptions,
}: Params) {
	// const projectBrowserContext = useContext(ProjectBrowserContext);
	const toolbarContext = useContext(ToolbarContext)!;

	const renderList = () => toolbarContext.focusedDropdown == label;
	const toggleDropdown = () => {
		toolbarContext.setFocusedDropdown(renderList() ? null : label);
	};

	const isMultiselect = typeof selectedOptions != 'string';
	const sortedOptions = options.sort((a, b) =>
		a.toLowerCase() > b.toLowerCase() ? 1 : a.toLowerCase() < b.toLowerCase() ? -1 : 0
	);

	const handleChange = (option: string, optionValue: boolean) => {
		if (isMultiselect) {
			const newOptions = { ...selectedOptions };
			newOptions[option] = !optionValue;
			setSelectedOptions(newOptions);
		} else {
			setSelectedOptions(option);
		}
	};

	const DropDownOption = ({ option, optionValue }: { option: string; optionValue: boolean }) => {
		return (
			<div className='dropdown-option'>
				<input
					type={isMultiselect ? 'checkbox' : 'radio'}
					checked={optionValue}
					onChange={() => handleChange(option, optionValue)}
				/>
				<span>{option}</span>
			</div>
		);
	};

	const DropDownOptions = () => {
		return (
			<div className='dropdown-list'>
				{sortedOptions.map((option) => (
					<DropDownOption
						option={option}
						optionValue={
							isMultiselect ? selectedOptions[option] : selectedOptions == option
						}
					/>
				))}
			</div>
		);
	};

	return (
		<div className='toolbar-dropdown'>
			<button className='dropdown-button' onClick={toggleDropdown}>
				<FontAwesomeIcon className='dropdown-icon' icon={icon} />
				<span className='dropdown-label'>{label}</span>
				<FontAwesomeIcon
					className='dropdown-arrow'
					icon={renderList() ? faCaretUp : faCaretDown}
				/>
			</button>
			{renderList() && <DropDownOptions />}
		</div>
	);
}
