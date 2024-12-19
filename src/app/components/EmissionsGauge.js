import React, { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { GAUGE_CONSTANTS } from './gauge/GaugeConstants'
import { describeArc } from './gauge/gaugeUtils'
import { GaugeMarkers } from './gauge/GaugeMarkers'
import { GaugeText } from './gauge/GaugeText'

const GaugePath = React.memo(({ d, color }) => (
  <path
    d={d}
    fill='none'
    stroke={color}
    strokeWidth={GAUGE_CONSTANTS.strokeWidth}
  />
))

const EmissionsGauge = ({
	productionData = {},
	transportData = {},
	processingData = {},
	extractionData = {},
	disposalData = {},
	chevronImage
}) => {
	const t = useTranslations()

  // Calculate total emissions per kg
  const emissionsPerKg = useMemo(() => 
    (productionData?.carbonEmissionsPerKg || 0) +
    (transportData?.totalEmissions || 0) +
    (processingData?.totalEmissions || 0) +
    (extractionData?.totalEmissions || 0) +
    (disposalData?.totalEmissions || 0),
    [productionData, transportData, processingData, extractionData, disposalData]
  )   

  // Calculate grade and color
  const { grade, color } = useMemo(() => {
    if (emissionsPerKg <= 0) return { grade: 'A', color: '#59A659' }
    if (emissionsPerKg <= 2.3) return { grade: 'B', color: '#FFFF66' }
    if (emissionsPerKg <= 16) return { grade: 'C', color: '#D16E11' }
    return { grade: 'D', color: '#AD1F1F' }
  }, [emissionsPerKg])

  // Calculate monthly usage and potential reduction
  const monthlyUsage = productionData?.monthlyCoffeeUsage || 0
  const greenCoffeeEmissions = -1.28
  const monthlyReduction =
    (emissionsPerKg - greenCoffeeEmissions) * monthlyUsage

  // Calculate normalized angle for the gauge
  const MIN_EMISSIONS = -30
  const MAX_EMISSIONS = 30
  const normalizedEmissions = Math.min(
    Math.max(emissionsPerKg, MIN_EMISSIONS),
    MAX_EMISSIONS
  )
  const normalizedAngle =
    ((normalizedEmissions - MIN_EMISSIONS) /
      (MAX_EMISSIONS - MIN_EMISSIONS)) *
    180

  const getEndAngle = useMemo(() => {
    return (grade, emissionsPerKg) => {
      switch (grade) {
        case 'A':
          return 90
        case 'B':
          return 90 + ((emissionsPerKg / 2.3) * 45)
        case 'C':
          return 135 + ((emissionsPerKg - 2.3) / (16 - 2.3)) * 45
        case 'D':
          return 180 + ((emissionsPerKg - 16) / (GAUGE_CONSTANTS.max - 16)) * 180
        default:
          return 90
      }
    }
  }, [])

	return (
		<div className='col1-gauge'>
			<h5>{t('col1-2-h')}</h5>
			{/* Gauge SVG */}
			<figure>
        <svg viewBox='0 0 326 169' xmlns='http://www.w3.org/2000/svg' fillRule='evenodd' clipRule='evenodd' strokeLinejoin='round' strokeMiterlimit='2'>
					{/* Background arc */}
          <GaugePath
            d={describeArc(
              GAUGE_CONSTANTS.centerX,
              GAUGE_CONSTANTS.centerY,
              GAUGE_CONSTANTS.radius,
              GAUGE_CONSTANTS.startAngle,
              0
            )}
            color='#e5e7eb'
          />
        {/* Filled arc based on value */}
        <GaugePath
          d={describeArc(
            GAUGE_CONSTANTS.centerX,
            GAUGE_CONSTANTS.centerY,
            GAUGE_CONSTANTS.radius,
            GAUGE_CONSTANTS.startAngle,
            getEndAngle(grade, emissionsPerKg)
          )}
          color={color}
        />
        <GaugeMarkers />
        <GaugeText t={t} grade={grade} emissionsPerKg={emissionsPerKg} />
				</svg>
			</figure>

      <p className='grade'>
				{t.rich('gauge-grade', {
					br: () => <br />,
					emissions: emissionsPerKg.toFixed(2),
					reduction: Math.abs(monthlyReduction).toFixed(2)
				})}
			</p>

			<div className='key'>
				<p className='k-title'>
					{t.rich('gauge-key-h', {
						br: () => <br />
					})}
				</p>
				<p>
					{t.rich('gauge-key', {
						br: () => <br />
					})}
				</p>
			</div>

			<p className='page-link'>
				<Link href='/page4'>{t('p4-link')}</Link>
				{chevronImage && (
					<Image
						src={chevronImage}
						width={4}
						height={8}
						alt='chevron icon'
					/>
				)}
			</p>
		</div>
	)
}

export default EmissionsGauge
