// Dependencies ------------------------------------------------------------------------------------
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort, faTag } from '@fortawesome/free-solid-svg-icons';

import ToolbarDropdown from './toolbar-dropdown';

import './projects-toolbar.scss';

// Types -------------------------------------------------------------------------------------------
interface Params {
	tags: { [index: string]: boolean };
	setTags: React.Dispatch<React.SetStateAction<{ [index: string]: boolean }>>;
}

// Component ---------------------------------------------------------------------------------------
export default function ProjectsToolbar({ tags: options, setTags: setOptions }: Params) {
	// console.log(options);

	return (
		<div className='projects-toolbar'>
			<div className='toolbar-section toolbar-filters'>
				<span>
					<FontAwesomeIcon icon={faFilter} /> Filters:
				</span>
				<ToolbarDropdown
					label='Tags'
					icon={faTag}
					options={options}
					setOptions={setOptions}
				/>
			</div>
			<div className='toolbar-separator' />
			<div className='toolbar-section toolbar-sorting'>
				<span>
					<FontAwesomeIcon icon={faSort} /> Sorting:
				</span>
			</div>
		</div>
	);
}
