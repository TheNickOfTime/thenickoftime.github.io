// Dependencies ------------------------------------------------------------------------------------
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort, faTag } from '@fortawesome/free-solid-svg-icons';

import ToolbarDropdown from './dropdowns/toolbar-dropdown';

import './projects-toolbar.scss';

// Types -------------------------------------------------------------------------------------------
interface Params {
	projectCount: number;
	tags: { [index: string]: boolean };
	setTags: React.Dispatch<React.SetStateAction<{ [index: string]: boolean }>>;
	sortingOptions: string[];
	sortBy: string;
	setSortBy: React.Dispatch<React.SetStateAction<string>>;
	sortingOrder: string[];
	sortOrder: string;
	setSortOrder: React.Dispatch<React.SetStateAction<string>>;
}

// Component ---------------------------------------------------------------------------------------
export default function ProjectsToolbar({
	projectCount,
	tags,
	setTags,
	sortingOptions,
	sortBy,
	setSortBy,
	sortingOrder,
	sortOrder,
	setSortOrder,
}: Params) {
	// console.log(options);

	return (
		<div className='projects-toolbar'>
			<div className='toolbar-section'>
				<span>
					<strong>{projectCount} Projects</strong>
				</span>
			</div>
			<div className='toolbar-separator' />
			<div className='toolbar-section toolbar-filters'>
				<span>
					<FontAwesomeIcon icon={faFilter} /> Filters:
				</span>
				<ToolbarDropdown
					label='Tags'
					icon={faTag}
					multiselectOptions={tags}
					setMultiselectOptions={setTags}
				/>
			</div>
			<div className='toolbar-separator' />
			<div className='toolbar-section toolbar-sorting'>
				<span>
					<FontAwesomeIcon icon={faSort} /> Sorting:
				</span>
				<ToolbarDropdown
					label={sortBy}
					icon={faTag}
					singleselectOptions={sortingOptions}
					selectedOption={sortBy}
					setSingleselectOption={setSortBy}
					multiselect={false}
				/>
				<ToolbarDropdown
					label={sortOrder}
					icon={faTag}
					singleselectOptions={sortingOrder}
					selectedOption={sortOrder}
					setSingleselectOption={setSortOrder}
					multiselect={false}
				/>
			</div>
		</div>
	);
}
