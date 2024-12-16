'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '../../../i18n/routing'
import { useEmissionsContext } from '../../context/EmissionsContext'
import LocaleSwitch from '../../components/LocaleSwitch'
import EmissionsBreakdown from '../../components/EmissionsBreakdown'
import CarbonReducingEmissions from '../../components/CarbonReducingEmissions'
import TravelDistanceEquivalent from '../../components/TravelDistanceEquivalent'
import PineTreeEquivalent from '../../components/PineTreeEquivalent'
import minus from '../../../../public/assets/minus.png'
import car from '../../../../public/assets/car.png'
import trees from '../../../../public/assets/trees.png'

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
					<div className='card-row-wrapper'>
						<div className='card square'>
							<h5>{t('col1-1-h')}</h5>
							<p>
								{productionData?.monthlyCoffeeUsage?.toFixed(
									2
								) || 0}{' '}
								kg
							</p>
						</div>
						<div className='card square'>
							<h5>Expected monthly carbon emissions</h5>
							<p>
								{productionData?.monthlyCoffeeUsage?.toFixed(
									2
								) || 0}{' '}
								kg
							</p>
						</div>
					</div>
					<div className='card'>
						<h5>{t('col1-2-h')}</h5>
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
					<h5>{t('col2-h')}</h5>
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
					<h5>{t('col3-h')}</h5>
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
					<div className='card p4-accent h180'>
						<h5>
							{t.rich('col4-1', {
								br: () => <br />
							})}
						</h5>
						<div className='col4-1'>
							<p>--data-- kg</p>
							<Image
								src={minus}
								width={90}
								height={90}
								alt='minus icon'
							/>
						</div>
					</div>
					<div className='font-20'>
						{t.rich('col4-2', {
							br: () => <br />
						})}
					</div>
					<div className='card h180'>
						<h5>
							{t.rich('col4-3', {
								br: () => <br />
							})}
						</h5>
						<div className='row-wrapper col4-3'>
							<p>--data-- km</p>
							<Image
								src={car}
								width={132.6}
								height={61.8}
								alt='car icon'
							/>
						</div>
					</div>
					<div className='font-12'>
						{t.rich('col4-4', {
							br: () => <br />
						})}
					</div>
					<div className='card h180'>
						<h5>
							{t.rich('col4-5', {
								br: () => <br />
							})}
						</h5>
						<div className='row-wrapper col4-5'>
							<p>--data-- {t('trees')}</p>
							<Image
								src={trees}
								width={94.8}
								height={109}
								alt='icon of trees'
							/>
						</div>
					</div>
					<div className='font-12'>
						{t.rich('col4-6', {
							br: () => <br />
						})}
					</div>
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
						<h5>Monthly Coffee Usage</h5>
						<p>
							{productionData?.monthlyCoffeeUsage?.toFixed(2) ||
								0}{' '}
							kg
						</p>
					</div>

					<div className='stage-column' style={{ flex: 1 }}>
						<h5>The level of carbon emissions I use</h5>
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
						<h5>Expected Monthly Carbon Emissions</h5>
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
						<h5>
							Monthly carbon emissions when using carbon-reducing
							coffee
						</h5>
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
						<h5>
							When applying carbon-reducing coffee, how much will
							carbon emissions be reduced each Month?
						</h5>
						<CarbonReducingEmissions
							productionData={productionData}
							transportData={transportData}
							processingData={processingData}
							extractionData={extractionData}
							disposalData={disposalData}
						/>
					</div>

					<div className='stage-column' style={{ flex: 1 }}>
						<h5>
							What is the equivalent travel distance for carbon
							emissions?
						</h5>
						<TravelDistanceEquivalent
							productionData={productionData}
							transportData={transportData}
							processingData={processingData}
							extractionData={extractionData}
							disposalData={disposalData}
						/>
					</div>

					<div className='stage-column' style={{ flex: 1 }}>
						<h5>
							What is the equivalent travel distance for carbon
							reduction?
						</h5>
						<PineTreeEquivalent
							productionData={productionData}
							transportData={transportData}
							processingData={processingData}
							extractionData={extractionData}
							disposalData={disposalData}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
