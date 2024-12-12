'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '../../../i18n/routing'
import { useEmissionsContext } from '../../context/EmissionsContext'
import LocaleSwitch from '../../components/LocaleSwitch'
import ProductionStage from '../../stages/ProductionStage'
import TransportationStage from '../../stages/TransportationStage'
import ProcessingStage from '../../stages/ProcessingStage'
import ExtractionStage from '../../stages/ExtractionStage'
import DisposalStage from '../../stages/DisposalStage'
import ProgressBar from '../../components/ProgressBar'
import chevron from '../../../../public/assets/chevron.png'
import chevronwht from '../../../../public/assets/chevron-wht.png'

export default function Home() {
	const t = useTranslations()

	const {
		productionData,
		setProductionData,
		transportData,
		setTransportData,
		processingData,
		setProcessingData,
		extractionData,
		setExtractionData,
		disposalData,
		setDisposalData
	} = useEmissionsContext() // Access the context

	// State to track the completion status of each stage
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

	return (
		<>
			<div className='page-header'>
				<div className='left'>
					<h2>{t('p2-header')}</h2>
					<p>{t('p2-para1')}</p>
					<p>{t('p2-para2')}</p>
				</div>
				<LocaleSwitch />
			</div>

			<div className='stage-container'>
				{/* Render all stages on the same page and pass down context data */}
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
						true, // Monthly usage is always completed
						isProductionStageCompleted,
						isTransportStageCompleted,
						isProcessingStageCompleted,
						isExtractionStageCompleted,
						isDisposalStageCompleted
					]}
				/>
				{/* Button to navigate to page3 */}
				<Link href='/page3' className='calculate-button'>
					<span>{t('p2-button')}</span>
					<Image
						src={chevronwht}
						width={6}
						height={11}
						alt='white chevron'
					/>
				</Link>
			</div>
		</>
	)
}
