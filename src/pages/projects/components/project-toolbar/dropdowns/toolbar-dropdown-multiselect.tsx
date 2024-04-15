interface Params {
	options: { [index: string]: boolean };
	setOptions: React.Dispatch<React.SetStateAction<{ [index: string]: boolean }>>;
}

export default function ToolbarDropdownMultiselect({ options, setOptions }: Params) {
	const localOptions = { ...options };

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
		const sortedOptions = Object.keys(options).sort((a, b) => {
			if (a.toLowerCase() > b.toLowerCase()) {
				return 1;
			} else if (a.toLowerCase() < b.toLowerCase()) {
				return -1;
			} else {
				return 0;
			}
		});

		return (
			<div className='dropdown-list'>
				{sortedOptions.map((option: string) => (
					<DropdownOption optionName={option} key={option} />
				))}
			</div>
		);
	};

	return <DropdownList />;
}
