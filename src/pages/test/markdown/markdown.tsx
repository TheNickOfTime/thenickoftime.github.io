export default function MarkdownTest() {
	const projects = import.meta.glob('/src/projects/test/*.mdx', { eager: true });
	// console.log(projects);
	for (const project in projects) {
		console.log(projects[project].frontmatter);
	}

	const renderMarkdown = () => {
		return (
			<div id='markdown-test'>
				{Object.values(projects).map((project: object) => {
					return <div>{project.frontmatter.name}</div>;
				})}
			</div>
		);
	};

	return renderMarkdown();
}
