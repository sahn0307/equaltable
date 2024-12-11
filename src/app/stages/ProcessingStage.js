'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ProcessingStage({
	processingData,
	setProcessingData,
	setStageCompleted
}) {
	const [monthlyEmissions, setMonthlyEmissions] = useState(0)
	const [isCompleted, setIsCompleted] = useState(false)
	const t = useTranslations()

	// Handle input changes for form fields
	const handleInputChange = (e) => {
		const { name, value } = e.target
		const parsedValue = parseFloat(value)
		setProcessingData((prevData) => ({
			...prevData,
			[name]: parsedValue > 0 ? parsedValue : 0 // Ensure positive values
		}))
	}

	// Handle radio button changes for roaster and smoke eliminator types
	const handleRadioChange = (e) => {
		const { name, value } = e.target
		setProcessingData((prevData) => ({
			...prevData,
			[name]: value
		}))
	}

	// Calculate monthly emissions whenever processingData changes
	useEffect(() => {
		const {
			roasterType = '',
			powerConsumption = 0,
			gasConsumption = 0,
			usageTime = 0,
			smokeEliminator = '',
			smokeEliminatorPowerConsumption = 0,
			afterburnerPowerConsumption = 0,
			afterburnerGasConsumption = 0,
			afterburnerUsageTime = 0,
			productionQuantity = 0
		} = processingData

		const electricityEmissionFactor = 0.495 // kg CO₂ per kWh
		const gasEmissionFactor = 0.23 // kg CO₂ per kcal

		let emissions = 0

		// Calculate emissions for roaster type
		if (roasterType === 'electric') {
			emissions +=
				powerConsumption * usageTime * electricityEmissionFactor
		} else if (roasterType === 'gas') {
			emissions += gasConsumption * usageTime * gasEmissionFactor
		}

		// Calculate emissions for smoke eliminator type
		if (smokeEliminator === 'smokeEliminator') {
			emissions +=
				smokeEliminatorPowerConsumption * electricityEmissionFactor
		} else if (smokeEliminator === 'afterburner') {
			emissions +=
				afterburnerPowerConsumption *
					afterburnerUsageTime *
					electricityEmissionFactor +
				afterburnerGasConsumption *
					afterburnerUsageTime *
					gasEmissionFactor
		}

		// Normalize emissions per kg of production
		const normalizedEmissions =
			productionQuantity > 0 ? emissions / productionQuantity : 0
		setMonthlyEmissions(normalizedEmissions)
	}, [processingData])

	// Check if all fields are filled out
	useEffect(() => {
		const {
			roasterType,
			powerConsumption,
			gasConsumption,
			usageTime,
			productionQuantity,
			smokeEliminator,
			smokeEliminatorPowerConsumption,
			afterburnerPowerConsumption,
			afterburnerGasConsumption,
			afterburnerUsageTime
		} = processingData

		const completed =
			roasterType &&
			usageTime > 0 &&
			productionQuantity > 0 &&
			((roasterType === 'electric' && powerConsumption > 0) ||
				(roasterType === 'gas' && gasConsumption > 0)) &&
			((smokeEliminator === 'smokeEliminator' &&
				smokeEliminatorPowerConsumption > 0) ||
				(smokeEliminator === 'afterburner' &&
					afterburnerPowerConsumption > 0 &&
					afterburnerGasConsumption > 0 &&
					afterburnerUsageTime > 0) ||
				smokeEliminator === 'notInUse')

		setIsCompleted(completed)
		setStageCompleted(completed)
	}, [processingData, setStageCompleted])

	return (
		<section className={`stage-column ${isCompleted ? 'completed' : ''}`}>
			{t.rich('stg-4-col', {
				h3: (chunks) => {
					const className = isCompleted ? 'completed' : ''
					return <h3 className={className}>{chunks}</h3>
				}
			})}
			<article className='scroll'>
				<div className='question-container'>
					{/* Type of Roaster */}
					<div className='question-group'>
						<div className='question-row'>
							<label>{t('q6')}</label>
							<div className='radio-group'>
								<label>
									<input
										type='radio'
										name='roasterType'
										value='electric'
										checked={
											processingData.roasterType ===
											'electric'
										}
										onChange={handleRadioChange}
									/>
									{t('Electric')}
								</label>
								<label>
									<input
										type='radio'
										name='roasterType'
										value='gas'
										checked={
											processingData.roasterType === 'gas'
										}
										onChange={handleRadioChange}
									/>
									{t('Gas')}
								</label>
							</div>
						</div>
					</div>

					{/* Power Consumption */}
					{processingData.roasterType === 'electric' && (
						<div className='question-group'>
							<label>{t('q7')}</label>
							<input
								type='number'
								name='powerConsumption'
								value={processingData.powerConsumption || ''}
								onChange={handleInputChange}
								placeholder={t('input-default')}
							/>
							<span className='unit'>kW</span>
						</div>
					)}
					{processingData.roasterType === 'gas' && (
						<div className='question-group'>
							<label>{t('q8')}</label>
							<div className='row-group'>
								<input
									type='number'
									name='gasConsumption'
									value={processingData.gasConsumption || ''}
									onChange={handleInputChange}
									placeholder={t('input-default')}
								/>
								<span className='unit'>kcal /hr</span>
							</div>
						</div>
					)}

					{/* Usage Time */}
					<div className='question-group'>
						<label>{t('q9')}</label>
						<div className='row-group'>
							<input
								type='number'
								name='usageTime'
								value={processingData.usageTime || ''}
								onChange={handleInputChange}
								placeholder={t('input-default')}
							/>
							<span className='unit'>hr</span>
						</div>
					</div>

					{/* Production Quantity */}
					<div className='question-group'>
						<label>{t('q10')}</label>
						<div className='row-group'>
							<input
								type='number'
								name='productionQuantity'
								value={processingData.productionQuantity || ''}
								onChange={handleInputChange}
								placeholder={t('input-default')}
							/>
							<span className='unit'>kg</span>
						</div>
					</div>
				</div>
				{/* Smoke Eliminator */}
				<div className='question-group'>
					<label>{t('q11')}</label>
					<div className='radio-group trim-row'>
						<label className='trim-label'>
							<input
								type='radio'
								name='smokeEliminator'
								value='smokeEliminator'
								checked={
									processingData.smokeEliminator ===
									'smokeEliminator'
								}
								onChange={handleRadioChange}
								className='trim'
							/>
							{t('smoke-elim')}
						</label>
						<label className='trim-label'>
							<input
								type='radio'
								name='smokeEliminator'
								value='afterburner'
								checked={
									processingData.smokeEliminator ===
									'afterburner'
								}
								onChange={handleRadioChange}
								className='trim'
							/>
							{t('afterburner')}
						</label>
						<label className='trim-label'>
							<input
								type='radio'
								name='smokeEliminator'
								value='notInUse'
								checked={
									processingData.smokeEliminator ===
									'notInUse'
								}
								onChange={handleRadioChange}
								className='trim'
							/>
							{t('not-in-use')}
						</label>
					</div>
				</div>

				{/* Additional Smoke Eliminator Fields */}
				{processingData.smokeEliminator === 'smokeEliminator' && (
					<div className='question-group'>
						<label>{t('smoke-elim-power')}</label>
						<div className='row-group'>
							<input
								type='number'
								name='smokeEliminatorPowerConsumption'
								value={
									processingData.smokeEliminatorPowerConsumption ||
									''
								}
								onChange={handleInputChange}
								placeholder={t('input-default')}
							/>
							<span className='unit'>kW</span>
						</div>
					</div>
				)}
				{processingData.smokeEliminator === 'afterburner' && (
					<>
						<div className='question-group'>
							<label>{t('ab-power')}</label>
							<div className='row-group'>
								<input
									type='number'
									name='afterburnerPowerConsumption'
									value={
										processingData.afterburnerPowerConsumption ||
										''
									}
									onChange={handleInputChange}
									placeholder={t('input-default')}
								/>
								<span className='unit'>kW</span>
							</div>
						</div>

						<div className='question-group'>
							<label>{t('ab-gas')}</label>
							<div className='row-group'>
								<input
									type='number'
									name='afterburnerGasConsumption'
									value={
										processingData.afterburnerGasConsumption ||
										''
									}
									onChange={handleInputChange}
									placeholder={t('input-default')}
								/>
								<span className='unit'>kcal /hr</span>
							</div>
						</div>

						<div className='question-group'>
							<label>{t('ab-hrs')}</label>
							<div className='row-group'>
								<input
									type='number'
									name='afterburnerUsageTime'
									value={
										processingData.afterburnerUsageTime ||
										''
									}
									onChange={handleInputChange}
									placeholder={t('input-default')}
								/>
								<span className='unit'>hr</span>
							</div>
						</div>
					</>
				)}
			</article>

			{/* Monthly Carbon Emissions Display */}
			<div className='carbon-summary'>
				<h4>{t('carbon-summary-title')}</h4>
				<p>{monthlyEmissions.toFixed(2)} kg CO₂</p>
			</div>
		</section>
	)
}
