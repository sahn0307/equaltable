'use client'

import { useMemo, useRef } from 'react'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { useEmissionsContext } from '../context/EmissionsContext'
import { useTranslations } from 'next-intl'

/**
 * EmissionsBreakdown:
 *  - By default, uses user data from EmissionsContext (calculateAllPerKg()).
 *  - If `overrideStageValues` is passed, we skip the context result
 *    and use the manually supplied per-stage values (productionPerKg, etc.).
 *  - We also allow negative totals to produce negative or >100% percentages,
 *    which can happen if the total net is negative (e.g., offsets).
 */
export default function EmissionsBreakdown({ overrideStageValues }) {
  const { productionData, calculateAllPerKg } = useEmissionsContext()
  const chartRef = useRef(null)
  const t = useTranslations()

  // 1) Get normal stage values from context
  let {
    productionPerKg,
    transportPerKg,
    processingPerKg,
    extractionPerKg,
    disposalPerKg,
    totalPerKg
  } = calculateAllPerKg()

  // 2) If overrideStageValues is provided, override the context results
  if (overrideStageValues) {
    const {
      productionPerKg: oProd = 0,
      transportPerKg: oTrans = 0,
      processingPerKg: oProc = 0,
      extractionPerKg: oExtr = 0,
      disposalPerKg: oDisp = 0
    } = overrideStageValues

    productionPerKg = oProd
    transportPerKg = oTrans
    processingPerKg = oProc
    extractionPerKg = oExtr
    disposalPerKg = oDisp
    totalPerKg = oProd + oTrans + oProc + oExtr + oDisp
  }

  // 3) The user’s monthly usage to convert to monthly totals
  const monthlyUsage = productionData?.monthlyCoffeeUsage || 0

  // 4) Build an array of cumulative stage values, each multiplied by monthly usage
  const stageValues = useMemo(() => {
    const cumulativeVals = [
      productionPerKg,
      productionPerKg + transportPerKg,
      productionPerKg + transportPerKg + processingPerKg,
      productionPerKg + transportPerKg + processingPerKg + extractionPerKg,
      productionPerKg + transportPerKg + processingPerKg + extractionPerKg + disposalPerKg
    ]
    return cumulativeVals.map(val => val * monthlyUsage)
  }, [
    productionPerKg,
    transportPerKg,
    processingPerKg,
    extractionPerKg,
    disposalPerKg,
    monthlyUsage
  ])

  const stageLabels = useMemo(() => [
    t('stg-2'),
    t('stg-3'),
    t('stg-4'),
    t('stg-5'),
    t('stg-6')
  ], [t])

  const colors = useMemo(() => [
    '#FFC198',
    '#FF9550',
    '#FE6400',
    '#FE6400',
    '#C15610'
  ], [])

  // 5) ChartJS data
  const data = useMemo(() => ({
    labels: ['', '', '', '', ''],
    datasets: [
      {
        data: stageValues,
        fill: true,
        tension: 0,
        borderColor: '#FB923C',
        borderWidth: 0,
        pointBackgroundColor: colors,
        pointRadius: 5,
        pointBorderWidth: 0,
        backgroundColor(ctx) {
          const { chart, ctx: canvasCtx, chartArea } = ctx.chart
          if (!chartArea) {
            return 'rgba(251,146,60,0.2)'
          }
          const gradient = canvasCtx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          )
          gradient.addColorStop(0, '#fff')
          gradient.addColorStop(1, 'rgba(251, 146, 60, 0.6)')
          return gradient
        }
      }
    ]
  }), [stageValues, colors])

  // 6) Chart options & tooltips
  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const idx = context.dataIndex
            const diff = stageValues[idx] - (stageValues[idx - 1] || 0)
            return `${stageLabels[idx]}: ${diff.toFixed(2)} kg CO₂`
          }
        }
      }
    },
    scales: {
      x: {
        display: false,
        grid: { display: false }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          maxTicksLimit: 10,
          callback: (value) => value.toFixed(0),
          color: '#4B5563',
          font: { size: 12 }
        }
      }
    },
    elements: {
      line: {
        borderWidth: 2
      }
    }
  }), [stageLabels, stageValues])

  // 7) Render
  return (
    <div className='line-graph-wrapper'>
      {/* Show the total monthly emissions (can be negative if offsets) */}
      <p className='kg'>{(totalPerKg * monthlyUsage).toFixed(2)} kg</p>

      {/* Chart */}
      <div className="line-graph-container">
        <Line ref={chartRef} data={data} options={options} />
      </div>

      {/* Legend / index with negative % support */}
      <div className="graph-index">
        {stageLabels.map((label, idx) => {
          // Calculate the difference for this stage
          const diff = stageValues[idx] - (stageValues[idx - 1] || 0)
          const grandTotal = totalPerKg * monthlyUsage

          // If grandTotal is 0, produce 0% to avoid dividing by 0
          const pct = grandTotal === 0 ? 0 : (diff / grandTotal) * 100

          return (
            <div key={idx} className="row-nowrap">
              <div className='group-container'>
                <div className="color-chip" style={{ backgroundColor: colors[idx] }} />
                <span>{label}</span>
              </div>
              {/* Negative totals or stage diffs now produce negative or >100% values */}
              <span className='justify-right'>{pct.toFixed(0)}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
