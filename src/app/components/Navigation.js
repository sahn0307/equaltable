// src/app/components/Navigation.js
export default function Navigation({
	currentStage,
	totalStages,
	nextStage,
	prevStage
}) {
	return (
		<div>
			{currentStage > 1 && <button onClick={prevStage}>Back</button>}
			{currentStage < totalStages && (
				<button onClick={nextStage}>Next</button>
			)}
		</div>
	)
}
