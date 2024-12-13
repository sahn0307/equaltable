'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '../../../i18n/routing'
import { useEmissionsContext } from '../../context/EmissionsContext'
import LocaleSwitch from '../../components/LocaleSwitch'
import EmissionsBreakdown from '../../components/EmissionsBreakdown'

export default function Page3() {
	const t = useTranslations()

	const {
		productionData,
		transportData,
		processingData,
		extractionData,
		disposalData
	} = useEmissionsContext() // Access the context data

	// Placeholder calculations for total emissions
	const totalEmissions = 0 // Replace with actual calculation logic
	const clampedEmissions = 0 // Placeholder
	const normalizedPosition = 0 // Placeholder
	const grade = 'A' // Placeholder

	return (
		<section className='page3-wrapper'>
			<div className='page-header'>
				<div className='left'>
					<h2>{t('p3-header')}</h2>
					<p>{t('p3-p')}</p>
				</div>
				<LocaleSwitch />
			</div>
			<div className='content-wrapper'>
				{/* col 1 */}
				<article>
					<div className='card'>
						<h3>{t('col1-1-h')}</h3>
						<p>
							{productionData?.monthlyCoffeeUsage?.toFixed(2) ||
								0}{' '}
							kg
						</p>
					</div>
					<div className='card'>
						<h3>{t('col1-2-h')}</h3>
						<div className='gauge-container'>
							<div className='gauge'>
								<div
									className='gauge-pointer'
									style={{
										left: `${normalizedPosition}%`
									}}
								/>
							</div>
							<div className='gauge-labels'>
								<span>-30</span>
								<span>30</span>
							</div>
						</div>
						<p>
							<Link href='/page4' className='link'>
								{t('p4-link')}
							</Link>
						</p>
					</div>
				</article>

				{/* col 2 */}
				<article className='card'>
					<h3>{t('col2-h')}</h3>
					<EmissionsBreakdown
						productionData={productionData}
						transportData={transportData}
						processingData={processingData}
						extractionData={extractionData}
						disposalData={disposalData}
					/>
				</article>

				{/* col 3 */}
				<article className='card'>
					<h3>{t('col3-h')}</h3>
					<EmissionsBreakdown
						productionData={productionData}
						transportData={transportData}
						processingData={processingData}
						extractionData={extractionData}
						disposalData={disposalData}
					/>
				</article>

				{/* col 4 */}
				<article>
					<div className='card'>
						<h3>{t('col4-1')}</h3>
						<p>--data-- kg</p>
					</div>
					<div>{t('col4-2')}</div>
					<div className='card'>
						<h3>
                        {t('col4-3')}
						</h3>
						<p>--data-- km</p>
					</div>
					<div>{t('col4-4')}</div>
					<div className='card'>
						<h3>
                        {t('col4-5')}
						</h3>
						<p>--data-- {t('trees')}</p>
					</div>
					<div>{t('col4-6')}</div>
				</article>
			</div>

			<br />
			<br />
			<br />
			<div
				className='page-content'
				style={{ display: 'flex', gap: '20px', alignItems: 'stretch' }}>
				{/* First Column */}
				<div
					className='column'
					style={{
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						gap: '20px'
					}}>
					<div className='stage-column' style={{ flex: 1 }}>
						<h3>Monthly Coffee Usage</h3>
						<p>
							{productionData?.monthlyCoffeeUsage?.toFixed(2) ||
								0}{' '}
							kg
						</p>
					</div>

					<div className='stage-column' style={{ flex: 1 }}>
						<h3>The level of carbon emissions I use</h3>
						<div className='gauge-container'>
							<div className='gauge'>
								<div
									className='gauge-pointer'
									style={{
										left: `${normalizedPosition}%`
									}}
								/>
							</div>
							<div className='gauge-labels'>
								<span>-30</span>
								<span>30</span>
							</div>
						</div>
						
						<p>
							<Link href='/page4' className='link'>
								Ways to increase carbon emission reduction
								ratings
							</Link>
						</p>
					</div>
				</div>

				{/* Second Column */}
				<div
					className='column'
					style={{
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						gap: '20px'
					}}>
					<div className='stage-column' style={{ flex: 1 }}>
						<h3>Expected Monthly Carbon Emissions</h3>
						<EmissionsBreakdown
							productionData={productionData}
							transportData={transportData}
							processingData={processingData}
							extractionData={extractionData}
							disposalData={disposalData}
						/>
					</div>
				</div>

				{/* Third Column */}
				<div
					className='column'
					style={{
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						gap: '20px'
					}}>
					<div className='stage-column' style={{ flex: 1 }}>
						<h3>
							Monthly carbon emissions when using carbon-reducing
							coffee
						</h3>
						<EmissionsBreakdown
							productionData={productionData}
							transportData={transportData}
							processingData={processingData}
							extractionData={extractionData}
							disposalData={disposalData}
						/>
					</div>
				</div>

				{/* Fourth Column */}
				<div
					className='column'
					style={{
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						gap: '20px'
					}}>
					<div className='stage-column' style={{ flex: 1 }}>
						<h3>
							When applying carbon-reducing coffee, how much will
							carbon emissions be reduced each Month?
						</h3>
						<p>Placeholder for data</p>
					</div>

					<div className='stage-column' style={{ flex: 1 }}>
						<h3>
							What is the equivalent travel distance for carbon
							emissions?
						</h3>
						<p>Placeholder for data</p>
					</div>

					<div className='stage-column' style={{ flex: 1 }}>
						<h3>
							What is the equivalent travel distance for carbon
							reduction?
						</h3>
						<p>Placeholder for data</p>
					</div>
				</div>
			</div>
		</section>
	)
}
