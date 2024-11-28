// src/app/page.js
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import ProductionStage from '../stages/ProductionStage'
import TransportationStage from '../stages/TransportationStage'
import ProcessingStage from '../stages/ProcessingStage'
import ExtractionStage from '../stages/ExtractionStage'
import DisposalStage from '../stages/DisposalStage'
import EmissionSummary from '../stages/EmissionSummary'
import ProgressBar from '../components/ProgressBar'
import chevron from '../../../public/assets/chevron.png'
import chevronwht from '../../../public/assets/chevron-wht.png'

export default function Home() {
	// Initialize each state with all required fields and provide default values
	const [productionData, setProductionData] = useState({
		monthlyCoffeeUsage: 0,
		carbonEmissionsPerKg: 0
	})

	const [transportData, setTransportData] = useState({
		farmToPortDistance: 0,
		portToDomesticDistance: 0,
		domesticDistance: 0,
		transportType: {
			farmToPort: 'truck',
			portToDomestic: 'ship',
			domestic: 'truck'
		}
	})

	const [processingData, setProcessingData] = useState({
		roasterType: 'electric',
		powerConsumption: 0,
		gasConsumption: 0,
		usageTime: 0,
		productionQuantity: 0,
		smokeEliminator: 'none'
	})

	const [extractionData, setExtractionData] = useState({
		grinderType: 'electric',
		powerConsumption: 0,
		usageTime: 0,
		productionQuantity: 0,
		extractorPower: 'no',
		extractorPowerConsumption: 0
	})

	const [disposalData, setDisposalData] = useState({
		wasteMass: 0,
		packagingType: 'LDPE',
		disposalMethod: 'landfill',
		isRecycled: 'no'
	})

	// State to manage if summary should be displayed
	const [showSummary, setShowSummary] = useState(false)
	const [summaryData, setSummaryData] = useState({})

	// State to track the completion status of each stage
	const [isMonthlyUsageCompleted, setMonthlyUsageCompleted] = 
		useState(true)
	const [isProductionStageCompleted, setProductionStageCompleted] =
		useState(false)
	const [isTransportStageCompleted, setTransportStageCompleted] =
		useState(false)
	const [isProcessingStageCompleted, setProcessingStageCompleted] =
		useState(false)
	const [isExtractionStageCompleted, setExtractionStageCompleted] =
		useState(false)
	const [isDisposalStageCompleted, setDisposalStageCompleted] =
		useState(false)

	// Function to show results summary
	const handleShowSummary = () => {
		// Capture the latest data
		setSummaryData({
			productionData,
			transportData,
			processingData,
			extractionData,
			disposalData
		})
		setShowSummary(true)
	}

	return (
		<>
            <div className='page-header'>
                <h2>Measure the carbon emissions from coffee farms to disposal</h2>
                <p>
                    This is a carbon emission calculator that allows you to know the
                    detailed carbon emissions of the coffee you use.
                </p>
                <p>
                    The carbon emissions are calculated based on 1 kg of raw beans,
                    and if the figures are unknown, they are entered based on an
                    international academic journal GEO paper.
                </p>
            </div>

			<div className='stage-container'>
				{/* Render all stages on the same page and pass down state and setters */}
				<ProductionStage
					productionData={productionData}
					setProductionData={setProductionData}
					setStageCompleted={setProductionStageCompleted}
				/>
				<Image src={chevron} width={16} height={16} alt='chevron' />
				<TransportationStage
					transportData={transportData}
					setTransportData={setTransportData}
					setStageCompleted={setTransportStageCompleted}
				/>
                <Image src={chevron} width={16} height={16} alt='chevron' />
				<ProcessingStage
					processingData={processingData}
					setProcessingData={setProcessingData}
					setStageCompleted={setProcessingStageCompleted}
				/>
                <Image src={chevron} width={16} height={16} alt='chevron' />
				<ExtractionStage
					extractionData={extractionData}
					setExtractionData={setExtractionData}
					setStageCompleted={setExtractionStageCompleted}
				/>
                <Image src={chevron} width={16} height={16} alt='chevron' />
				<DisposalStage
					disposalData={disposalData}
					setDisposalData={setDisposalData}
					setStageCompleted={setDisposalStageCompleted}
				/>
			</div>

			{/* Progress Bar */}
			<div className='progress-bar-container'>
				<ProgressBar
					stagesCompleted={[
						isMonthlyUsageCompleted,
						isProductionStageCompleted,
						isTransportStageCompleted,
						isProcessingStageCompleted,
						isExtractionStageCompleted,
						isDisposalStageCompleted
					]}
				/>
				{/* Button to show the emission summary */}
				<button
					className='calculate-button'
					onClick={handleShowSummary}>
					Check my monthly carbon emissions report
                    <Image src={chevronwht} width={6} height={11} alt='white chevron' />
				</button>
			</div>

			{/* Emission Summary Display */}
			{showSummary && (
				<div>
					<EmissionSummary
						productionData={summaryData.productionData}
						transportData={summaryData.transportData}
						processingData={summaryData.processingData}
						extractionData={summaryData.extractionData}
						disposalData={summaryData.disposalData}
					/>
				</div>
			)}
		</>
	)
}
