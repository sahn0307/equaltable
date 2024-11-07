// src/app/stages/DisposalStage.js
'use client'

import { useEffect, useState } from 'react'

export default function DisposalStage({ disposalData, setDisposalData }) {
	// Local state for monthly emissions at this stage
	const [monthlyEmissions, setMonthlyEmissions] = useState(0)

	// Handle input changes for disposal stage
	const handleInputChange = (e) => {
		const { name, value } = e.target
		setDisposalData((prevData) => ({
			...prevData,
			[name]: parseFloat(value)
		}))
	}

	// Handle radio button changes for upcycling status and packaging use
	const handleRadioChange = (e) => {
		const { name, value } = e.target
		setDisposalData((prevData) => ({
			...prevData,
			[name]: value
		}))
	}

	// Calculate monthly emissions whenever disposalData changes
	useEffect(() => {
		const {
			coffeeWasteEmissions,
			packagingEmissions,
			upcyclingStatus,
			packagingUsed
		} = disposalData

		let emissions = 0
		if (upcyclingStatus === 'no' && coffeeWasteEmissions > 0) {
			emissions += coffeeWasteEmissions
		}
		if (packagingUsed === 'yes' && packagingEmissions > 0) {
			emissions += packagingEmissions
		}

		setMonthlyEmissions(emissions)
	}, [disposalData])

	return (
		<section className='stage-column'>
			<h3>Disposal Stage</h3>

			{/* Upcycling Status */}
			<div className='question-group'>
				<label>Upcycling Status</label>
				<div>
					<label>
						<input
							type='radio'
							name='upcyclingStatus'
							value='yes'
							checked={disposalData.upcyclingStatus === 'yes'}
							onChange={handleRadioChange}
						/>
						Yes
					</label>
					<label>
						<input
							type='radio'
							name='upcyclingStatus'
							value='no'
							checked={disposalData.upcyclingStatus === 'no'}
							onChange={handleRadioChange}
						/>
						No
					</label>
				</div>
			</div>

			{/* Coffee Grounds Waste Emissions */}
			<div className='question-group'>
				<label>
					Carbon Emissions of Coffee Grounds Waste per 1kg of Coffee
					Beans (kg)
				</label>
				<input
					type='number'
					name='coffeeWasteEmissions'
					value={disposalData.coffeeWasteEmissions || 0.34}
					onChange={handleInputChange}
					// className='w-full p-2 border rounded'
					placeholder='Enter carbon emissions for coffee grounds waste'
				/>
			</div>

			{/* Packaging Usage */}
			<div className='question-group'>
				<label>
					Use Packaging for 1kg of Coffee Bean?
				</label>
				<div>
					<label>
						<input
							type='radio'
							name='packagingUsed'
							value='yes'
							checked={disposalData.packagingUsed === 'yes'}
							onChange={handleRadioChange}
						/>
						Yes
					</label>
					<label>
						<input
							type='radio'
							name='packagingUsed'
							value='no'
							checked={disposalData.packagingUsed === 'no'}
							onChange={handleRadioChange}
						/>
						No
					</label>
				</div>
			</div>

			{/* Packaging Emissions */}
			{disposalData.packagingUsed === 'yes' && (
				<div>
					<label>
						Carbon Emissions from Coffee Packaging Waste (kg)
					</label>
					<input
						type='number'
						name='packagingEmissions'
						value={disposalData.packagingEmissions || 0.049}
						onChange={handleInputChange}
						// className='w-full p-2 border rounded'
						placeholder='Enter carbon emissions from packaging waste'
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
