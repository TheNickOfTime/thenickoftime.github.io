interface Params {
	options: string[];
	selectedOption: string;
	setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

export default function ToolbarDropdownSingleselect({
	options,
	selectedOption,
	setSelectedOption,
}: Params) {
	const DropdownOption = ({ optionName }: { optionName: string }) => {
		// console.log(selectedOption);
		return (
			<div className='dropdown-option' id={optionName}>
				<input
					type='radio'
					id={optionName}
					value={optionName}
					checked={optionName == selectedOption}
					onChange={() => setSelectedOption(optionName)}
				/>
				<span> {optionName}</span>
			</div>
		);
	};

	const DropdownList = () => {
		const sortedOptions = options.sort((a, b) => {
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
