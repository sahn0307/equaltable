'use client'

import React, { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { GaugeMarkers } from './gauge/GaugeMarkers'
import { GaugeText } from './gauge/GaugeText'
import { GaugePath, GAUGE_CONSTANTS, describeArc, getGradeAndColor, calculateArcAngle } from './gauge/gaugeUtils'
import { useEmissionsContext } from '../context/EmissionsContext'

const EmissionsGauge = ({ chevronImage }) => {
  const t = useTranslations()
  const { productionData, calculateAllPerKg } = useEmissionsContext()

  // Get total emissions per kg from context
  const { totalPerKg } = calculateAllPerKg()

  // Get grade and color for gauge
  const { grade, color } = useMemo(() => 
    getGradeAndColor(totalPerKg), 
    [totalPerKg]
  )

  // Calculate monthly usage and potential reduction
  const monthlyUsage = productionData?.monthlyCoffeeUsage || 0
  const greenCoffeeEmissions = -1.28
  const monthlyReduction = 
    (totalPerKg - greenCoffeeEmissions) * monthlyUsage

  return (
    <div className='col1-gauge' style={{ textAlign: 'center' }}>
      <h5>{t('col1-2-h')}</h5>
      <figure>
        <svg viewBox='0 0 326 169' xmlns='http://www.w3.org/2000/svg' fillRule='evenodd' clipRule='evenodd' strokeLinejoin='round' strokeMiterlimit='2'>
          {/* Static arc */}
          <GaugePath
            d={describeArc(
              GAUGE_CONSTANTS.centerX,
              GAUGE_CONSTANTS.centerY,
              GAUGE_CONSTANTS.radius,
              GAUGE_CONSTANTS.startAngle,
              GAUGE_CONSTANTS.endAngle
            )}
            color='#e5e7eb'
          />
          {/* Color fill */}
          <GaugePath
            d={describeArc(
              GAUGE_CONSTANTS.centerX,
              GAUGE_CONSTANTS.centerY,
              GAUGE_CONSTANTS.radius,
              GAUGE_CONSTANTS.startAngle,
              calculateArcAngle(totalPerKg)
            )}
            color={color}
          />
          <GaugeMarkers />
          <GaugeText t={t} grade={grade} emissionsPerKg={totalPerKg} />
        </svg>
      </figure>

      <p className='grade'>
        {t.rich('gauge-grade', {
          br: () => <br />,
          emissions: totalPerKg.toFixed(2),
          reduction: Math.abs(monthlyReduction).toFixed(2)
        })}
      </p>

      <div className='key'>
        <p className='k-title'>
          {t.rich('gauge-key-h', {
            br: () => <br />
          })}
        </p>
        <p className='key-text p-style'>
          <span className='key-row'>
            {t.rich('key-a', {
              color: (chunks) => (<span className='w84'>{chunks}</span>),
              desc: (chunks) => (<span className='w278'>{chunks}</span>),
              br: () => <br />,
            })}
          </span>
          <span className='key-row'>
            {t.rich('key-b', {
              color: (chunks) => (<span className='w84'>{chunks}</span>),
              desc: (chunks) => (<span className='w278'>{chunks}</span>),
              br: () => <br />,
            })}
          </span>
          <span className='key-row'>
            {t.rich('key-c', {
              color: (chunks) => (<span className='w84'>{chunks}</span>),
              desc: (chunks) => (<span className='w278'>{chunks}</span>),
              br: () => <br />,
            })}
          </span>
          <span className='key-row'>
            {t.rich('key-d', {
              color: (chunks) => (<span className='w84'>{chunks}</span>),
              desc: (chunks) => (<span className='w278'>{chunks}</span>),
              br: () => <br />,
            })}
          </span>
        </p>
      </div>

      <p className='page-link'>
        <Link href='/page4'>{t('p4-link')}
          {chevronImage && (
            <Image
              src={chevronImage}
              width={4}
              height={8}
              alt='chevron icon'
            />
          )}
        </Link>
      </p>
    </div>
  )
}

export default EmissionsGauge
