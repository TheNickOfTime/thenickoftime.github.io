import './ea-font-issue.scss';

export default function EAFontIssue() {
	return (
		<div id='ea-font-issue-page'>
			<h2>EA Font Issue</h2>
			<p>
				The font 'ElectronicArtsText-Regular.otf' has lookup table rules that universally
				replace instances of 1/2, 1/4, 3/4, and 0/0 with other ascii characters ½, ¼, ¾, and
				% respectively, regardless of the context. This issue can be especially eggregious
				when manifesting in dates.
			</p>
			<p>
				Below is a table displaying how these character combos look in a baseline font
				(sans-serif), the original 'ElectronicArtsText' font, and finally my updated/fixed
				'ElectronicArtsText' font.
			</p>
			<div className='fonts'>
				<div className='table-scroll'>
					<table>
						<thead>
							<tr>
								<th>Default Font</th>
								<th>ElectronicArtsText (Original)</th>
								<th>ElectronicArtsText (Fixed)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1/2</td>
								<td>1/2</td>
								<td>1/2</td>
							</tr>
							<tr>
								<td>1/4</td>
								<td>1/4</td>
								<td>1/4</td>
							</tr>
							<tr>
								<td>3/4</td>
								<td>3/4</td>
								<td>3/4</td>
							</tr>
							<tr>
								<td>0/0</td>
								<td>0/0</td>
								<td>0/0</td>
							</tr>
							<tr>
								<td>01/2017</td>
								<td>01/2017</td>
								<td>01/2017</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
