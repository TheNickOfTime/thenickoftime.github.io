// Dependencies ------------------------------------------------------------------------------------
import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowDownAZ,
	faArrowDownWideShort,
	faArrowUpZA,
	faArrowUpWideShort,
	faAsterisk,
	faFilter,
	faFolderOpen,
	faSort,
	faStar,
	faTag,
} from '@fortawesome/free-solid-svg-icons';

import {
	ProjectBrowserContext,
	ProjectBrowserContextType,
} from '../project-browser/project-browser-context';
import {
	ShowOptions,
	SortByOptions,
	SortOrderOptions,
} from '../project-browser/project-browser-options';

import ToolbarDropdown from '../project-toolbar-dropdowns/toolbar-dropdown';
import './projects-toolbar.scss';
import { ToolbarContext, ToolbarContextType } from './projects-toolbar-context';

// Types -------------------------------------------------------------------------------------------
interface Params {
	setShow: React.Dispatch<React.SetStateAction<string>>;
	setTags: React.Dispatch<React.SetStateAction<{ [index: string]: boolean }>>;
	setTypes: React.Dispatch<React.SetStateAction<{ [index: string]: boolean }>>;
	setSortBy: React.Dispatch<React.SetStateAction<string>>;
	setSortOrder: React.Dispatch<React.SetStateAction<string>>;
}

// Component ---------------------------------------------------------------------------------------
export default function ProjectsToolbar({
	setShow,
	setTags,
	setTypes,
	setSortBy,
	setSortOrder,
}: Params) {
	const context: ProjectBrowserContextType = useContext(ProjectBrowserContext)!;

	const [focusedDropdown, setFocusedDropdown] = useState<string | null>(null);
	const toolbarContext: ToolbarContextType = {
		focusedDropdown: focusedDropdown,
		setFocusedDropdown: setFocusedDropdown,
	};

	const getShowIcon = () => {
		switch (context.show) {
			case 'All':
				return faAsterisk;
			case 'Featured Only':
				return faStar;
			default:
				return faStar;
		}
	};

	const getSortByIcon = () => {
		switch (context.sortBy) {
			case 'Alphabetical':
				return context.sortOrder == 'Descending' ? faArrowDownAZ : faArrowUpZA;
			case 'Featured':
				return faStar;
			default:
				return faStar;
		}
	};

	const getSortOrderIcon = () => {
		switch (context.sortOrder) {
			case 'Ascending':
				return faArrowUpWideShort;
			case 'Descending':
				return faArrowDownWideShort;
			default:
				return faArrowDownWideShort;
		}
	};

	const projectCount = Object.keys(context.filteredProjects).length;
	const showOptions = Object.values(ShowOptions);
	const sortByOptions = Object.values(SortByOptions);
	const sortOrderOptions = Object.values(SortOrderOptions);

	return (
		<div className='projects-toolbar'>
			<ToolbarContext.Provider value={toolbarContext}>
				<div className='toolbar-section toolbar-filters'>
					<span>
						<FontAwesomeIcon icon={faFilter} /> Filters:
					</span>
					<div className='dropdowns'>
						<ToolbarDropdown
							label={context.show}
							icon={getShowIcon()}
							options={showOptions}
							selectedOptions={context.show}
							setSelectedOptions={setShow}
						/>
						<ToolbarDropdown
							label='Tags'
							icon={faTag}
							options={Object.keys(context.tags)}
							selectedOptions={context.tags}
							setSelectedOptions={setTags}
						/>
						<ToolbarDropdown
							label='Types'
							icon={faFolderOpen}
							options={Object.keys(context.types)}
							selectedOptions={context.types}
							setSelectedOptions={setTypes}
						/>
					</div>
				</div>
				<div className='toolbar-separator' />
				<div className='toolbar-section toolbar-sorting'>
					<span>
						<FontAwesomeIcon icon={faSort} /> Sorting:
					</span>
					<div className='dropdowns'>
						<ToolbarDropdown
							label={context.sortBy}
							icon={getSortByIcon()}
							options={sortByOptions}
							selectedOptions={context.sortBy}
							setSelectedOptions={setSortBy}
						/>
						<ToolbarDropdown
							label={context.sortOrder}
							icon={getSortOrderIcon()}
							options={sortOrderOptions}
							selectedOptions={context.sortOrder}
							setSelectedOptions={setSortOrder}
						/>
					</div>
				</div>
				<div className='toolbar-separator' />
				<div className='toolbar-section'>
					<span>{projectCount} Projects</span>
				</div>
			</ToolbarContext.Provider>
		</div>
	);
}
