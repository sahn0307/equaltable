// src/app/stages/TransportationStage.js
'use client'

import { useEffect, useState } from 'react'

export default function TransportationStage({
	transportData,
	setTransportData
}) {
	// Local state for monthly emissions at this stage
	const [monthlyEmissions, setMonthlyEmissions] = useState(0)

	// Handle input changes for the transportation stage
	const handleInputChange = (e) => {
		const { name, value } = e.target
		setTransportData((prevData) => ({
			...prevData,
			[name]: parseFloat(value)
		}))
	}

	// Handle radio button changes for the transport type
	const handleRadioChange = (e) => {
		const { name, value } = e.target
		setTransportData((prevData) => ({
			...prevData,
			transportType: {
				...prevData.transportType,
				[name]: value
			}
		}))
	}

	// Emission factors for different types of transport
	const getTransportEmissionFactor = (type) => {
		switch (type) {
			case 'truck':
				return 0.2 // kg CO₂ per km
			case 'train':
				return 0.1 // kg CO₂ per km
			case 'ship':
				return 0.015 // kg CO₂ per km
			case 'flight':
				return 0.9 // kg CO₂ per km
			default:
				return 0
		}
	}

	// Calculate monthly emissions whenever transportData changes
	useEffect(() => {
		const {
			farmToPortDistance,
			portToDomesticDistance,
			domesticDistance,
			transportType
		} = transportData

		// Calculate emissions for each transport segment
		const farmToPortEmissions =
			(farmToPortDistance > 0 ? farmToPortDistance : 0) *
			getTransportEmissionFactor(transportType.farmToPort)
		const portToDomesticEmissions =
			(portToDomesticDistance > 0 ? portToDomesticDistance : 0) *
			getTransportEmissionFactor(transportType.portToDomestic)
		const domesticEmissions =
			(domesticDistance > 0 ? domesticDistance : 0) *
			getTransportEmissionFactor(transportType.domestic)

		// Total emissions for the transportation stage
		const totalEmissions =
			farmToPortEmissions + portToDomesticEmissions + domesticEmissions

		setMonthlyEmissions(totalEmissions)
	}, [transportData])

	return (
		<section className='stage-column'>
			<h3>Transportation Stage</h3>
			{/* Farm to Airport Distance */}
			<div className='question-group'>
				<label>Distance from Farm to Airport (km)</label>
				<div className='radio-group'>
					<label>
						<input
							type='radio'
							name='farmToPort'
							value='truck'
							checked={
								transportData.transportType.farmToPort ===
								'truck'
							}
							onChange={handleRadioChange}
						/>
						Truck
					</label>
					<label>
						<input
							type='radio'
							name='farmToPort'
							value='train'
							checked={
								transportData.transportType.farmToPort ===
								'train'
							}
							onChange={handleRadioChange}
						/>
						Train
					</label>
				</div>
				<input
					type='number'
					name='farmToPortDistance'
					value={transportData.farmToPortDistance}
					onChange={handleInputChange}
					// className='w-full p-2 border rounded'
					placeholder='Enter distance in km'
				/>
			</div>
			{/* Port to Domestic Ports/Airports Distance */}
			<div className='question-group'>
				<label>
					Distance from Ports or Airports in Coffee-Producing
					Countries to Domestic Ports or Airports (km)
				</label>
				<div className='radio-group'>
					<label className='mr-4'>
						<input
							type='radio'
							name='portToDomestic'
							value='flight'
							checked={
								transportData.transportType.portToDomestic ===
								'flight'
							}
							onChange={handleRadioChange}
						/>
						Flight
					</label>
					<label>
						<input
							type='radio'
							name='portToDomestic'
							value='ship'
							checked={
								transportData.transportType.portToDomestic ===
								'ship'
							}
							onChange={handleRadioChange}
						/>
						Ship
					</label>
				</div>
				<input
					type='number'
					name='portToDomesticDistance'
					value={transportData.portToDomesticDistance}
					onChange={handleInputChange}
					className='w-full p-2 border rounded'
					placeholder='Enter distance in km'
				/>
			</div>

			{/* Domestic Distance to Roasting Factory */}
			<div className='question-group'>
				<label className='block font-medium mb-2'>
					Distance from Airport or Port to Roasting Factory (km)
				</label>
				<div className='radio-group'>
					<label>
						<input
							type='radio'
							name='domestic'
							value='truck'
							checked={
								transportData.transportType.domestic === 'truck'
							}
							onChange={handleRadioChange}
						/>
						Truck
					</label>
					<label>
						<input
							type='radio'
							name='domestic'
							value='train'
							checked={
								transportData.transportType.domestic === 'train'
							}
							onChange={handleRadioChange}
						/>
						Train
					</label>
				</div>
				<input
					type='number'
					name='domesticDistance'
					value={transportData.domesticDistance}
					onChange={handleInputChange}
					// className='w-full p-2 border rounded'
					placeholder='Enter distance in km'
				/>
			</div>

			{/* Monthly Carbon Emissions Display */}
			<div className='carbon-summary'>
				<h4>Monthly Carbon Emissions at this Stage</h4>
				<p>{monthlyEmissions.toFixed(2)} kg CO₂</p>
			</div>
		</section>
	)
}
