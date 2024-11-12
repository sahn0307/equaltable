// src/app/components/ProgressBar.js
import React from 'react'

function ProgressBar({ stagesCompleted }) {
	const stages = [
		'Monthly usage entry completed',
		'Production Stage',
		'Transportation Stage',
		'Processing Stage',
		'Extraction Stage',
		'Disposal Stage',
		'Check results'
	]

	return (
		<div className='progress-bar'>
			{stages.map((stage, index) => (
				<div key={index} className='progress-step'>
					<div
						className={`circle ${
							stagesCompleted[index] ? 'completed' : ''
						}`}>
						{index + 1}
					</div>
					<div
						className={`label ${
							stagesCompleted[index] ? 'completed' : ''
						}`}>
						{stage}
					</div>
					{index < stages.length - 1 && (
						<div
							className={`line ${
								stagesCompleted[index] ? 'completed' : ''
							}`}></div>
					)}
				</div>
			))}

			<div class='step-wrapper'>
				<div class='step-item completed'>
					<div class='step-counter'>1</div>
					<div class='step-name'>Monthly usage entry completed</div>
				</div>
				<div class='step-item active'>
					<div class='step-counter'>2</div>
					<div class='step-name'>Production Stage</div>
				</div>
				<div class='step-item'>
					<div class='step-counter'>3</div>
					<div class='step-name'>Transportation Stage</div>
				</div>
				<div class='step-item'>
					<div class='step-counter'>4</div>
					<div class='step-name'>Processing Stage</div>
				</div>
				<div class='step-item'>
					<div class='step-counter'>5</div>
					<div class='step-name'>Extraction Stage</div>
				</div>
				<div class='step-item'>
					<div class='step-counter'>6</div>
					<div class='step-name'>Disposal Stage</div>
				</div>
				<div class='step-item'>
					<div class='step-counter'>7</div>
					<div class='step-name'>Check Results</div>
				</div>
			</div>
		</div>
	)
}

export default ProgressBar
