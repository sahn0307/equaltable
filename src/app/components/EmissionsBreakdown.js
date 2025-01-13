'use client'

import { useMemo, useRef } from 'react'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { useEmissionsContext } from '../context/EmissionsContext'
import { useTranslations } from 'next-intl'

export default function EmissionsBreakdown() {
  const { productionData, calculateAllPerKg } = useEmissionsContext()
  const chartRef = useRef(null)
  const t = useTranslations()

  const {
    productionPerKg,
    transportPerKg,
    processingPerKg,
    extractionPerKg,
    disposalPerKg,
    totalPerKg
  } = calculateAllPerKg()

  const stageValues = [
    productionPerKg,
    productionPerKg + transportPerKg,
    productionPerKg + transportPerKg + processingPerKg,
    productionPerKg + transportPerKg + processingPerKg + extractionPerKg,
    productionPerKg + transportPerKg + processingPerKg + extractionPerKg + disposalPerKg
  ]

  const stageLabels = [
    t('stg-2'),
    t('stg-3'),
    t('stg-4'),
    t('stg-5'),
    t('stg-6')
  ]

  const colors = [
    'rgba(251,146,60,0.2)',
    'rgba(251,146,60,0.4)',
    'rgba(251,146,60,0.6)',
    'rgba(251,146,60,0.8)',
    'rgba(251,146,60,1)'
  ]

  const data = useMemo(() => ({
    labels: ['', '', '', '', ''],
    datasets: [
      {
        data: stageValues,
        fill: true,
        tension: 0, // Set to 0 for linear lines
        borderColor: '#FB923C',
        pointBackgroundColor: colors,
        pointRadius: 6,
        backgroundColor(ctx) {
          const { chart, ctx: canvasCtx, chartArea } = ctx.chart
          if (!chartArea) return 'rgba(251,146,60,0.2)'

          const gradient = canvasCtx.createLinearGradient(
            0, chartArea.bottom,
            0, chartArea.top
          )
          gradient.addColorStop(0, 'rgba(251, 146, 60, 0.2)')
          gradient.addColorStop(1, 'rgba(251, 146, 60, 0.6)')
          return gradient
        }
      }
    ]
  }), [stageValues, colors])

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
            return `${stageLabels[idx]}: ${(stageValues[idx] - (stageValues[idx - 1] || 0)).toFixed(2)} kg CO₂`
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
          // stepsize:1,
          maxTicksLimit: 10, // Limit the number of ticks to 7
          callback: (value) => value.toFixed(0), // Display whole numbers only
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

  return (
    <div className='line-graph-wrapper'>
{/* calculated total percentage */}
      <p className='whatis'>{totalPerKg.toFixed(2)} kg</p>


{/* graph */}
      <div className="line-graph-container">
        <Line ref={chartRef} data={data} options={options} />
      </div>


{/* graph index */}
      <div className="graph-index">
        {stageLabels.map((label, idx) => {
          const pct = ((stageValues[idx] - (stageValues[idx - 1] || 0)) / totalPerKg) * 100
          return (
            <div key={idx} className="row-nowrap">
                <div className="color-chip" style={{ backgroundColor: colors[idx] }} />
                <span>{label}</span>
                <span className="test3">{pct.toFixed(0)}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
