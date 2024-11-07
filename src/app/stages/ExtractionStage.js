// src/app/stages/ExtractionStage.js
'use client'

import { useEffect, useState } from 'react'

export default function ExtractionStage({ extractionData, setExtractionData }) {
	// Local state for monthly emissions at this stage
	const [monthlyEmissions, setMonthlyEmissions] = useState(0)

	// Handle input changes for extraction stage
	const handleInputChange = (e) => {
		const { name, value } = e.target
		setExtractionData((prevData) => ({
			...prevData,
			[name]: parseFloat(value)
		}))
	}

	// Handle radio button changes for grinder and extractor power types
	const handleRadioChange = (e) => {
		const { name, value } = e.target
		setExtractionData((prevData) => ({
			...prevData,
			[name]: value
		}))
	}

	// Calculate monthly emissions whenever extractionData changes
	useEffect(() => {
		const {
			grinderType,
			powerConsumption,
			usageTime,
			extractorPower,
			extractorPowerConsumption
		} = extractionData

		let emissions = 0
		const electricityEmissionFactor = 0.495 // kg CO₂ per kWh

		if (
			grinderType === 'electric' &&
			powerConsumption > 0 &&
			usageTime > 0
		) {
			emissions +=
				powerConsumption * usageTime * electricityEmissionFactor
		}
		if (
			extractorPower === 'yes' &&
			extractorPowerConsumption > 0 &&
			usageTime > 0
		) {
			emissions +=
				extractorPowerConsumption *
				usageTime *
				electricityEmissionFactor
		}

		setMonthlyEmissions(emissions)
	}, [extractionData])

	return (
		<section className='stage-column'>
			<h3>Extraction Stage</h3>

			{/* Grinder Type */}
			<div className='question-group'>
				<label>
					Type of Grinder
				</label>
				<div className='radio-group'>
					<label>
						<input
							type='radio'
							name='grinderType'
							value='electric'
							checked={extractionData.grinderType === 'electric'}
							onChange={handleRadioChange}
						/>
						Electric
					</label>
					<label>
						<input
							type='radio'
							name='grinderType'
							value='manual'
							checked={extractionData.grinderType === 'manual'}
							onChange={handleRadioChange}
						/>
						Manual
					</label>
				</div>
			</div>

			{/* Grinder Power Consumption */}
			{extractionData.grinderType === 'electric' && (
				<div className='question-group'>
					<label>
						Grinder Power Consumption (kW)
					</label>
					<input
						type='number'
						name='powerConsumption'
						value={extractionData.powerConsumption}
						onChange={handleInputChange}
						// className='w-full p-2 border rounded'
						placeholder='Enter power consumption in kW'
					/>
				</div>
			)}

			{/* Grinder Usage Time */}
			<div className='question-group'>
				<label>
					Grinder Usage Time (hrs)
				</label>
				<input
					type='number'
					name='usageTime'
					value={extractionData.usageTime}
					onChange={handleInputChange}
					// className='w-full p-2 border rounded'
					placeholder='Enter usage time in hours'
				/>
			</div>

			{/* Grinder Production Quantity */}
			<div className='question-group'>
				<label>
					Grinder Production Quantity (kg)
				</label>
				<input
					type='number'
					name='productionQuantity'
					value={extractionData.productionQuantity}
					onChange={handleInputChange}
					// className='w-full p-2 border rounded'
					placeholder='Enter production quantity in kg'
				/>
			</div>

			{/* Extractor Power Usage */}
			<div className='question-group'>
				<label>
					Is Extractor Power Used?
				</label>
				<div className='radio-group'>
					<label>
						<input
							type='radio'
							name='extractorPower'
							value='yes'
							checked={extractionData.extractorPower === 'yes'}
							onChange={handleRadioChange}
						/>
						Yes
					</label>
					<label>
						<input
							type='radio'
							name='extractorPower'
							value='no'
							checked={extractionData.extractorPower === 'no'}
							onChange={handleRadioChange}
						/>
						No
					</label>
				</div>
			</div>

			{/* Extractor Power Consumption */}
			{extractionData.extractorPower === 'yes' && (
				<div className='question-group'>
					<label>
						Extractor Power Consumption (kW)
					</label>
					<input
						type='number'
						name='extractorPowerConsumption'
						value={extractionData.extractorPowerConsumption}
						onChange={handleInputChange}
						// className='w-full p-2 border rounded'
						placeholder='Enter power consumption in kW'
					/>
				</div>
			)}

			{/* Extractor Usage Time */}
			{extractionData.extractorPower === 'yes' && (
				<div className='question-group'>
					<label>
						Extractor Usage Time (hrs)
					</label>
					<input
						type='number'
						name='extractorUsageTime'
						value={extractionData.extractorUsageTime}
						onChange={handleInputChange}
						// className='w-full p-2 border rounded'
						placeholder='Enter usage time in hours'
					/>
				</div>
			)}

			{/* Extractor Production Quantity */}
			{extractionData.extractorPower === 'yes' && (
				<div className='question-group'>
					<label>
						Extractor Production Quantity (kg)
					</label>
					<input
						type='number'
						name='extractorProductionQuantity'
						value={extractionData.extractorProductionQuantity}
						onChange={handleInputChange}
						// className='w-full p-2 border rounded'
						placeholder='Enter production quantity in kg'
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
