// src/app/stages/ProcessingStage.js
'use client'

import { useEffect, useState } from 'react'

export default function ProcessingStage({ processingData, setProcessingData }) {
	// Local state for monthly emissions at this stage
	const [monthlyEmissions, setMonthlyEmissions] = useState(0)

	// Handle input changes for processing stage
	const handleInputChange = (e) => {
		const { name, value } = e.target
		setProcessingData((prevData) => ({
			...prevData,
			[name]: parseFloat(value) || 0
		}))
	}

	// Handle radio button changes for the roaster and smoke eliminator types
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
			afterburnerUsageTime = 0
		} = processingData

		let emissions = 0
		const electricityEmissionFactor = 0.495 // kg CO₂ per kWh
		const gasEmissionFactor = 0.23 // kg CO₂ per kcal

		if (
			roasterType === 'electric' &&
			powerConsumption > 0 &&
			usageTime > 0
		) {
			emissions +=
				powerConsumption * usageTime * electricityEmissionFactor
		} else if (
			roasterType === 'gas' &&
			gasConsumption > 0 &&
			usageTime > 0
		) {
			emissions += gasConsumption * usageTime * gasEmissionFactor
		}

		if (
			smokeEliminator === 'smokeEliminator' &&
			smokeEliminatorPowerConsumption > 0
		) {
			emissions +=
				smokeEliminatorPowerConsumption * electricityEmissionFactor
		} else if (smokeEliminator === 'afterburner') {
			if (afterburnerPowerConsumption > 0 && afterburnerUsageTime > 0) {
				emissions +=
					afterburnerPowerConsumption *
					afterburnerUsageTime *
					electricityEmissionFactor
			}
			if (afterburnerGasConsumption > 0 && afterburnerUsageTime > 0) {
				emissions +=
					afterburnerGasConsumption *
					afterburnerUsageTime *
					gasEmissionFactor
			}
		}

		setMonthlyEmissions(emissions)
	}, [processingData])

	return (
		<section className='stage-column'>
			<h3>Processing Stage</h3>
			{/* Type of Roaster */}
			<div className='question-group'>
				<label>Type of Roaster</label>
				<div>
					<label>
						<input
							type='radio'
							name='roasterType'
							value='electric'
							checked={processingData.roasterType === 'electric'}
							onChange={handleRadioChange}
						/>
						Electric
					</label>
					<label>
						<input
							type='radio'
							name='roasterType'
							value='gas'
							checked={processingData.roasterType === 'gas'}
							onChange={handleRadioChange}
						/>
						Gas
					</label>
				</div>
			</div>

			{/* Roaster Power Consumption - Only displayed if Electric Roaster is selected */}
			{processingData.roasterType === 'electric' && (
				<div className='question-group'>
					<label>Roaster Power Consumption (kcal)</label>
					<input
						type='number'
						name='powerConsumption'
						value={processingData.powerConsumption ?? 0}
						onChange={handleInputChange}
						placeholder='Enter power consumption in kcal'
					/>
				</div>
			)}

			{/* Roaster Gas Consumption - Only displayed if Gas Roaster is selected */}
			{processingData.roasterType === 'gas' && (
				<div className='question-group'>
					<label>Roaster Gas Consumption (kcal/hr)</label>
					<input
						type='number'
						name='gasConsumption'
						value={processingData.gasConsumption ?? 0}
						onChange={handleInputChange}
						placeholder='Enter gas consumption in kcal/hr'
					/>
				</div>
			)}

			{/* Roaster Usage Time */}
			<div className='question-group'>
				<label>Roaster Usage Time (hrs)</label>
				<input
					type='number'
					name='usageTime'
					value={processingData.usageTime ?? 0}
					onChange={handleInputChange}
					placeholder='Enter usage time in hours'
				/>
			</div>

			{/* Roaster Production Quantity */}
			<div className='question-group'>
				<label>Roaster Production Quantity (kg)</label>
				<input
					type='number'
					name='productionQuantity'
					value={processingData.productionQuantity ?? 0}
					onChange={handleInputChange}
					placeholder='Enter production quantity in kg'
				/>
			</div>

			{/* Smoke Eliminator Type */}
			<div className='question-group'>
				<label>Smoke Eliminator Type</label>
				<div>
					<label>
						<input
							type='radio'
							name='smokeEliminator'
							value='smokeEliminator'
							checked={
								processingData.smokeEliminator ===
								'smokeEliminator'
							}
							onChange={handleRadioChange}
						/>
						Smoke Eliminator
					</label>
					<label>
						<input
							type='radio'
							name='smokeEliminator'
							value='afterburner'
							checked={
								processingData.smokeEliminator === 'afterburner'
							}
							onChange={handleRadioChange}
						/>
						Afterburner
					</label>
					<label>
						<input
							type='radio'
							name='smokeEliminator'
							value='notInUse'
							checked={
								processingData.smokeEliminator === 'notInUse'
							}
							onChange={handleRadioChange}
						/>
						Not in Use
					</label>
				</div>
			</div>

			{/* Smoke Eliminator Power Consumption */}
			{processingData.smokeEliminator === 'smokeEliminator' && (
				<div className='question-group'>
					<label>Smoke Eliminator Power Consumption (kW)</label>
					<input
						type='number'
						name='smokeEliminatorPowerConsumption'
						value={
							processingData.smokeEliminatorPowerConsumption ?? 0
						}
						onChange={handleInputChange}
						placeholder='Enter power consumption in kW'
					/>
				</div>
			)}

			{/* Afterburner Power Consumption */}
			{processingData.smokeEliminator === 'afterburner' && (
				<div className='question-group'>
					<label>Afterburner Power Consumption (kW)</label>
					<input
						type='number'
						name='afterburnerPowerConsumption'
						value={processingData.afterburnerPowerConsumption ?? 0}
						onChange={handleInputChange}
						placeholder='Enter power consumption in kW'
					/>
				</div>
			)}

			{/* Afterburner Gas Consumption */}
			{processingData.smokeEliminator === 'afterburner' && (
				<div className='question-group'>
					<label>Afterburner Gas Consumption (kcal/hr)</label>
					<input
						type='number'
						name='afterburnerGasConsumption'
						value={processingData.afterburnerGasConsumption ?? 0}
						onChange={handleInputChange}
						placeholder='Enter gas consumption in kcal/hr'
					/>
				</div>
			)}

			{/* Afterburner Usage Time */}
			{processingData.smokeEliminator === 'afterburner' && (
				<div className='question-group'>
					<label>Afterburner Usage Time (hrs)</label>
					<input
						type='number'
						name='afterburnerUsageTime'
						value={processingData.afterburnerUsageTime ?? 0}
						onChange={handleInputChange}
						placeholder='Enter usage time in hours'
					/>
				</div>
			)}

			{/* Monthly Carbon Emissions Display */}
			<div className='carbon-summary'>
				<h4>Monthly Carbon Emissions at this Stage</h4>
				<p>{monthlyEmissions.toFixed(2)} kg CO₂</p>
			</div>
		</section>
	)
}
