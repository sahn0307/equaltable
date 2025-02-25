'use client'

import { useMemo, useRef } from 'react'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { useEmissionsContext } from '../context/EmissionsContext'
import { useTranslations } from 'next-intl'

export default function EmissionsBreakdown({ overrideStageValues }) {
  const { calculateAllPerKg } = useEmissionsContext()
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

  // 3) Build cumulative values (including an implicit origin at 0,0)
  const stageValues = useMemo(() => [
    0, // Origin point (hidden)
    productionPerKg,
    productionPerKg + transportPerKg,
    productionPerKg + transportPerKg + processingPerKg,
    productionPerKg + transportPerKg + processingPerKg + extractionPerKg,
    productionPerKg + transportPerKg + processingPerKg + extractionPerKg + disposalPerKg
  ], [
    productionPerKg,
    transportPerKg,
    processingPerKg,
    extractionPerKg,
    disposalPerKg
  ])

  // Actual labels for legend and tooltips
  const stageLabels = useMemo(() => [
    t('stg-2'),
    t('stg-3'),
    t('stg-4'),
    t('stg-5'),
    t('stg-6')
  ], [t])

  // Ensure colors correctly match the stages (ignore origin point)
  const colors = useMemo(() => [
    null, // No color for origin
    '#FFC198', // Production
    '#FF9550', // Transport
    '#FE6400', // Processing
    '#FE6400', // Extraction
    '#C15610'  // Disposal
  ], [])

  // 4) ChartJS data
  const data = useMemo(() => ({
    labels: ['', '', '', '', '', ''], // Keep six total points, but first is implicit
    datasets: [
      {
        data: stageValues,
        fill: true,
        tension: 0,
        borderColor: '#FB923C',
        borderWidth: 2,
        pointBackgroundColor: (ctx) => colors[ctx.dataIndex] || 'transparent', // Ensure correct color mapping
        pointRadius: (ctx) => (ctx.dataIndex === 0 ? 0 : 5), // Hide the first point
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

  // 5) Chart options & tooltips
  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: 'white',
        titleColor: 'black',
        bodyColor: 'black',
        titleFont: { weight: 'bold' },
        bodyFont: { weight: 'normal' },
        padding: 10,
        cornerRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        usePointStyle: true,
        boxWidth: 8,
        boxHeight: 8,
        callbacks: {
          // Set the title to be the stage name
          title: (context) => {
            if (context[0].dataIndex === 0) return '' // Hide tooltip for origin
            const idx = context[0].dataIndex - 1
            return stageLabels[idx]
          },
          // Set the label to be the emissions value
          label: (context) => {
            if (context.dataIndex === 0) return '' // Hide tooltip for origin
            const diff = stageValues[context.dataIndex] - (stageValues[context.dataIndex - 1] || 0)
            return `${diff.toFixed(2)} kg CO₂`
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
          stepSize: 1, // Ensures no duplicate values
          callback: (value, index, values) => {
            return index === 0 || value !== values[index - 1] ? value.toFixed(0) : ''; 
          },
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

  // 6) Render
  return (
    <div className='line-graph-wrapper'>
      {/* Show the total emissions per kilogram */}
      <p className='kg'>{totalPerKg.toFixed(2)} kg</p>

      {/* Chart */}
      <div className="line-graph-container">
        <Line ref={chartRef} data={data} options={options} />
      </div>

      {/* Legend / index */}
      <div className="graph-index">
        {stageLabels.map((label, idx) => {
          // Calculate the difference for this stage
          const diff = stageValues[idx + 1] - (stageValues[idx] || 0)

          return (
            <div key={idx} className="row-nowrap">
              <div className='group-container'>
                <div className="color-chip" style={{ backgroundColor: colors[idx + 1] }} />
                <span>{label}</span>
              </div>
              {/* Show actual emissions values instead of percentages */}
              <span className='justify-right'>{diff.toFixed(2)} kg CO₂</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}