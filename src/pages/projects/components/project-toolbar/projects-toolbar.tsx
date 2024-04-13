// Dependencies ------------------------------------------------------------------------------------
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowDownAZ,
	faArrowDownWideShort,
	faArrowUpZA,
	faArrowUpWideShort,
	faFilter,
	faFolderOpen,
	faSort,
	faStar,
	faTag,
} from '@fortawesome/free-solid-svg-icons';

import ToolbarDropdown from './dropdowns/toolbar-dropdown';

import './projects-toolbar.scss';

// Types -------------------------------------------------------------------------------------------
interface Params {
	projectCount: number;
	tags: { [index: string]: boolean };
	setTags: React.Dispatch<React.SetStateAction<{ [index: string]: boolean }>>;
	types: { [index: string]: boolean };
	setTypes: React.Dispatch<React.SetStateAction<{ [index: string]: boolean }>>;
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
	types,
	setTypes,
	sortingOptions,
	sortBy,
	setSortBy,
	sortingOrder,
	sortOrder,
	setSortOrder,
}: Params) {
	// console.log(options);

	const getSortByIcon = () => {
		switch (sortBy) {
			case 'Alphabetical':
				return sortOrder == 'Descending' ? faArrowDownAZ : faArrowUpZA;
			case 'Featured':
				return faStar;
			default:
				return faStar;
		}
	};

	const getSortOrderIcon = () => {
		switch (sortOrder) {
			case 'Ascending':
				return faArrowUpWideShort;
			case 'Descending':
				return faArrowDownWideShort;
			default:
				return faArrowDownWideShort;
		}
	};

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
				<ToolbarDropdown
					label='Types'
					icon={faFolderOpen}
					multiselectOptions={types}
					setMultiselectOptions={setTypes}
				/>
			</div>
			<div className='toolbar-separator' />
			<div className='toolbar-section toolbar-sorting'>
				<span>
					<FontAwesomeIcon icon={faSort} /> Sorting:
				</span>
				<ToolbarDropdown
					label={sortBy}
					icon={getSortByIcon()}
					singleselectOptions={sortingOptions}
					selectedOption={sortBy}
					setSingleselectOption={setSortBy}
					multiselect={false}
				/>
				<ToolbarDropdown
					label={sortOrder}
					icon={getSortOrderIcon()}
					singleselectOptions={sortingOrder}
					selectedOption={sortOrder}
					setSingleselectOption={setSortOrder}
					multiselect={false}
				/>
			</div>
		</div>
	);
}
