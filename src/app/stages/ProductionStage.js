import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ProductionStage({
	productionData,
	setProductionData,
	setStageCompleted
}) {
	// Local state for monthly emissions at this stage
	const [monthlyEmissions, setMonthlyEmissions] = useState(0)
	const [isCompleted, setIsCompleted] = useState(false)
	const t = useTranslations()

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
			{t.rich('stg-2-col', {
				h3: (chunks) => {
					const className = isCompleted ? 'completed' : ''
					return <h3 className={className}>{chunks}</h3>
				}
			})}
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
							placeholder={t('input-default')}
						/>
						<span className='unit'>kg</span>
					</div>
				</div>
				{/* !! ^^ This question-group needs to be removed, I can't do it since it breaks stuff. */}
				{/* Carbon Emissions from Farm */}
				<div className='question-group'>
					<label>{t('q2')}</label>
					<div className='row-group'>
						<input
							type='number'
							name='carbonEmissionsPerKg'
							placeholder={t('input-default')}
							value={productionData.carbonEmissionsPerKg || 1.64}
							onChange={handleInputChange}
						/>
						<span className='unit'>kg</span>
					</div>
				</div>
				<div className='footnote'>
					<p>{t('f-1')}</p>
					<br />
					<br />
					<br />
					<span className='bold'>{t('ref')}</span>
					<p>{t('ref-1')}</p>
					<br />
					<p>{t('ref-2')}</p>
				</div>
			</article>

			{/* Monthly Carbon Emissions Display */}
			<div className='carbon-summary'>
				<h4>{t('carbon-summary-title')}</h4>
				<p>{monthlyEmissions.toFixed(2)} kg CO₂</p>
			</div>
		</section>
	)
}
