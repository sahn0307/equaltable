import React, { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Image from 'next/image'

const EmissionsGauge = ({
    productionData = {},
    transportData = {},
    processingData = {},
    extractionData = {},
    disposalData = {},
    chevronImage
}) => {
    const t = useTranslations()

    const calculations = useMemo(() => {
        // Calculate total emissions per kg
        const emissionsPerKg =
            (productionData?.carbonEmissionsPerKg || 0) +
            (transportData?.totalEmissions || 0) +
            (processingData?.totalEmissions || 0) +
            (extractionData?.totalEmissions || 0) +
            (disposalData?.totalEmissions || 0)

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

        // Calculate grade and color
        let grade
        let color
        if (emissionsPerKg <= 0) {
            grade = 'A'
            color = '#59A659' // green
        } else if (emissionsPerKg <= 2.3) {
            grade = 'B'
            color = '#FFFF66' // yellow
        } else if (emissionsPerKg <= 16) {
            grade = 'C'
            color = '#D16E11' // orange
        } else {
            grade = 'D'
            color = '#AD1F1F' // red
        }

        return {
            normalizedAngle,
            grade,
            color,
            emissionsPerKg,
            monthlyReduction
        }
    }, [productionData, transportData, processingData, extractionData, disposalData])

    const describeArc = (x, y, radius, startAngle, endAngle) => {
        const start = {
            x: x + radius * Math.cos(Math.PI * (startAngle / 180)),
            y: y + radius * Math.sin(Math.PI * (startAngle / 180))
        }

        const end = {
            x: x + radius * Math.cos(Math.PI * (endAngle / 180)),
            y: y + radius * Math.sin(Math.PI * (endAngle / 180))
        }

        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        return [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
        ].join(" ")
    }

    return (
        <div className='col1-gauge'>
            <h5>{t('col1-2-h')}</h5>

            {/* Gauge SVG */}
            <figure>
                <svg viewBox='0 0 326 169' xmlns='http://www.w3.org/2000/svg' fillRule='evenodd' clipRule='evenodd' strokeLinejoin='round' strokeMiterlimit='2'>

                    {/* Background arc */}
                    <path
                        d={describeArc(165, 169, 124, 180, 0)}
                        fill='none'
                        stroke='#e5e7eb'
                        strokeWidth='20'
                    />

                    {/* Filled arc based on value */}
                    <path
                        d={describeArc(
                            165,
                            169,
                            124,
                            180,
                            calculations.grade === 'D' ? 180 - calculations.normalizedAngle : 0 - calculations.normalizedAngle // Conditional endAngle
                        )}
                        fill='none'
                        stroke={calculations.color}
                        strokeWidth='20'
                    />

                    {/* Scale labels */}
                    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='translate(22.909 157.847)' />
                    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='translate(301.909 157.847)' />
                    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(90 75.031 93.378)' />
                    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(74.99 50.99 96.916)' />
                    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(105.01 93.388 90.615)' />
                    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(60 17.255 101.763)' />
                    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(120 108.388 88.537)' />
                    <g>
                        <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(45 -36.584 109.578)' />
                        <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(135 121.263 86.668)' />
                    </g>
                    <g>
                        <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(30 -140.592 124.672)' />
                        <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(150 132.807 84.993)' />
                    </g>
                    <g>
                        <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(14.98 -445.654 168.283)' />
                        <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(165.02 143.485 83.421)' />
                    </g>

                    <g>
                        <text fontWeight='500' fontSize='11' fill='#f1f3f2' transform='translate(162.001 7.854)'>0</text>
                    </g>
                    <g>
                        <text fontWeight='500' fontSize='11' fill='#f1f3f2' transform='translate(313.522 164.854)'>30</text>
                    </g>
                    <g>
                        <text fontWeight='500' fontSize='11' fill='#f1f3f2' transform='translate(-.539 164.854)'>-30</text>
                    </g>

                    {/* Grade and emissions display */}
                    <text fontFamily="'Roboto','Pretendard','Arial', sans-serif" fontWeight='500' fontSize='28' fill='#131523' transform='translate(112.354 131.847)'>
                        {t.rich('grade', { grade: calculations.grade })}
                    </text>

                    <text fontFamily="'Roboto','Pretendard','Arial', sans-serif" fontWeight='500' fontSize='17' fill='#131523' transform='translate(133.865 153.847)'>
                        {calculations.emissionsPerKg.toFixed(2)}kg
                    </text>
                </svg>
            </figure>

            <p className='grade'>
                {t.rich('gauge-grade', {
                    br: () => <br />,
                    emissions: calculations.emissionsPerKg.toFixed(2),
                    reduction: Math.abs(calculations.monthlyReduction).toFixed(2)
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