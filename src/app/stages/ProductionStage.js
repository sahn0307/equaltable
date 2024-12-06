import { useEffect, useState } from 'react'

export default function ProductionStage({
	productionData,
	setProductionData,
	setStageCompleted
}) {
	// Local state for monthly emissions at this stage
	const [monthlyEmissions, setMonthlyEmissions] = useState(0)
	const [isCompleted, setIsCompleted] = useState(false)

	// Set default value for carbonEmissionsPerKg if not provided
	useEffect(() => {
		if (productionData.carbonEmissionsPerKg === undefined) {
			setProductionData((prevData) => ({
				...prevData,
				carbonEmissionsPerKg: 1.64
			}))
		}
	}, [productionData, setProductionData])

	// Handle input changes for production stage
	const handleInputChange = (e) => {
		const { name, value } = e.target
		setProductionData((prevData) => ({
			...prevData,
			[name]: parseFloat(value)
		}))
	}

	// Calculate monthly emissions whenever productionData changes
	useEffect(() => {
		const { monthlyCoffeeUsage, carbonEmissionsPerKg } = productionData

		// Calculate emissions only if values are positive numbers
		if (monthlyCoffeeUsage > 0 && carbonEmissionsPerKg > 0) {
			setMonthlyEmissions(monthlyCoffeeUsage * carbonEmissionsPerKg)
		} else {
			setMonthlyEmissions(0)
		}
	}, [productionData])

	// Check if all fields are filled out
	useEffect(() => {
		const { monthlyCoffeeUsage, carbonEmissionsPerKg } = productionData
		const completed = monthlyCoffeeUsage > 0 && carbonEmissionsPerKg > 0
		setIsCompleted(completed)
		setStageCompleted(completed)
	}, [productionData, setStageCompleted])

	return (
		<section className={`stage-column ${isCompleted ? 'completed' : ''}`}>
			<h3 className={ isCompleted ? 'completed' : ''}>
				Production Stage
			</h3>
			<article className='scroll'>
				{/* Monthly Coffee Usage */}
				<div className='question-group'>
					<label>Monthly Coffee Usage</label>
					<div className='row-group'>
						<input
							type='number'
							name='monthlyCoffeeUsage'
							value={productionData.monthlyCoffeeUsage || ''}
							onChange={handleInputChange}
							placeholder='Enter monthly coffee usage in kg'
						/>
						<span className='unit'>kg</span>
					</div>
				</div>
				{/* Carbon Emissions from Farm */}
				<div className='question-group'>
					<label>
						Carbon emissions from farms per 1kg of roasted beans
					</label>
					<div className='row-group'>
						<input
							type='number'
							name='carbonEmissionsPerKg'
							placeholder='Please enter a number'
							value={productionData.carbonEmissionsPerKg || 1.64}
							onChange={handleInputChange}
						/>
						<span className='unit'>kg</span>
					</div>
				</div>
				<div className='footnote'>
					<p>
						Please enter the carbon emissions associated with 1 kg
						of coffee from your coffee farm. If you do not know the
						carbon emissions from your farm, please use the preset
						values based on the paper provided below.
					</p>
					<br />
					<br />
					<br />
					<span className='bold'>Reference</span>
					<p>
						1. (2020)Life cycle assessment synthesis of the carbon
						footprint of Arabica coffee
					</p>
					<br />
					<p>
						2. (2018) Environmental Impact Associated with the
						Supply Chain and Production of Grounding and Roasting
						Coffee through Life Cycle Analysis
					</p>
				</div>
			</article>

			{/* Monthly Carbon Emissions Display */}
			<div className='carbon-summary'>
				<h4>Monthly carbon emissions at this stage</h4>
				<p>{monthlyEmissions.toFixed(2)} kg CO₂</p>
			</div>
		</section>
	)
}
