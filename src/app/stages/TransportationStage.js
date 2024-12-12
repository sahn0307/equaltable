// src/app/stages/TransportationStage.js
'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export default function TransportationStage({
	transportData,
	setTransportData,
	setStageCompleted
}) {
	// Local state for monthly emissions at this stage
	const [monthlyEmissions, setMonthlyEmissions] = useState(0)
	const [isCompleted, setIsCompleted] = useState(false)
	const t = useTranslations()

	// Set default values for transportType if not provided
	useEffect(() => {
		if (!transportData.transportType) {
			setTransportData((prevData) => ({
				...prevData,
				transportType: {
					farmToPort: 'truck', // Default for first group
					portToDomestic: 'flight', // Default for second group
					domestic: 'truck' // Default for third group
				}
			}))
		}
	}, [transportData, setTransportData])

	// Handle input changes for the transportation stage
	const handleInputChange = (e) => {
		const { name, value } = e.target
		const parsedValue = parseFloat(value)
		setTransportData((prevData) => ({
			...prevData,
			[name]: parsedValue > 0 ? parsedValue : 0 // Ensure positive values
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

	// Calculate emissions and check completion
	useEffect(() => {
		const {
			farmToPortDistance,
			portToDomesticDistance,
			domesticDistance,
			transportType
		} = transportData

		// Calculate emissions for each transport segment
		const farmToPortEmissions =
			(farmToPortDistance || 0) *
			getTransportEmissionFactor(transportType.farmToPort)
		const portToDomesticEmissions =
			(portToDomesticDistance || 0) *
			getTransportEmissionFactor(transportType.portToDomestic)
		const domesticEmissions =
			(domesticDistance || 0) *
			getTransportEmissionFactor(transportType.domestic)

		// Total emissions for the transportation stage
		const totalEmissions =
			farmToPortEmissions + portToDomesticEmissions + domesticEmissions
		setMonthlyEmissions(totalEmissions)

		// Check if all fields are completed
		const completed =
			farmToPortDistance > 0 &&
			portToDomesticDistance > 0 &&
			domesticDistance > 0 &&
			transportType.farmToPort &&
			transportType.portToDomestic &&
			transportType.domestic

		setIsCompleted(completed)
		setStageCompleted(completed)
	}, [transportData, setStageCompleted])

	return (
		<section className={`stage-column ${isCompleted ? 'completed' : ''}`}>
			{t.rich('stg-3-col', {
				h3: (chunks) => {
					const className = isCompleted ? 'completed' : ''
					return <h3 className={className}>{chunks}</h3>
				}
			})}
			<article className='scroll'>
				{/* Farm to Port Distance */}
				<div className='question-group'>
					<label>{t('q3')}</label>
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
							{t('truck')}
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
							{t('train')}
						</label>
					</div>
					<div className='row-group'>
						<input
							type='number'
							name='farmToPortDistance'
							placeholder={t('input-default')}
							value={transportData.farmToPortDistance || ''}
							onChange={handleInputChange}
						/>
						<span className='unit'>km</span>
					</div>
				</div>
				{/* Port to Domestic Ports/Airports Distance */}
				<div className='question-group'>
					<label>{t('q4')}</label>
					<div className='radio-group'>
						<label>
							<input
								type='radio'
								name='portToDomestic'
								value='flight'
								checked={
									transportData.transportType
										.portToDomestic === 'flight'
								}
								onChange={handleRadioChange}
							/>
							{t('flight')}
						</label>
						<label>
							<input
								type='radio'
								name='portToDomestic'
								value='ship'
								checked={
									transportData.transportType
										.portToDomestic === 'ship'
								}
								onChange={handleRadioChange}
							/>
							{t('ship')}
						</label>
					</div>
					<div className='row-group'>
						<input
							type='number'
							name='portToDomesticDistance'
							value={transportData.portToDomesticDistance || ''}
							onChange={handleInputChange}
							placeholder={t('input-default')}
						/>
						<span className='unit'>km</span>
					</div>
				</div>

				{/* Domestic Distance to Roasting Factory */}
				<div className='question-group'>
					<label>{t('q5')}</label>
					<div className='radio-group'>
						<label>
							<input
								type='radio'
								name='domestic'
								value='truck'
								checked={
									transportData.transportType.domestic ===
									'truck'
								}
								onChange={handleRadioChange}
							/>
							{t('truck')}
						</label>
						<label>
							<input
								type='radio'
								name='domestic'
								value='train'
								checked={
									transportData.transportType.domestic ===
									'train'
								}
								onChange={handleRadioChange}
							/>
							{t('train')}
						</label>
					</div>
					<div className='row-group'>
						<input
							type='number'
							name='domesticDistance'
							value={transportData.domesticDistance || ''}
							onChange={handleInputChange}
							placeholder={t('input-default')}
						/>
						<span className='unit'>km</span>
					</div>
				</div>
				<div className='footnote'>
					<p>{t('f-2')}</p>
					<br />
					<br />
				</div>
				<a
					href='https://example.com'
					target='_blank'
					className='external-link'>
					{t('external-link')}
				</a>
				<br />
				<br />
				<br />
			</article>

			{/* Monthly Carbon Emissions Display */}
			<div className='carbon-summary'>
				<h4>{t('carbon-summary-title')}</h4>
				<p>{monthlyEmissions.toFixed(2)} kg CO₂</p>
			</div>
		</section>
	)
}
