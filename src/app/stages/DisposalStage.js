'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export default function DisposalStage({
  disposalData,
  setDisposalData,
  setStageCompleted
}) {
  const [monthlyEmissions, setMonthlyEmissions] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const t = useTranslations()

  // Handle radio button changes
  const handleRadioChange = (e) => {
    const { name, value } = e.target
    setDisposalData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  // Calculate emissions
  useEffect(() => {
    const { upcyclingStatus = '' } = disposalData

    // Final Value Equation:
    // Upcycling No => 0.34
    // Upcycling Yes => 0
    let emissions = 0
    if (upcyclingStatus === 'no') {
      emissions = 0.34
    }

    setMonthlyEmissions(emissions)
  }, [disposalData])

  // Check if stage is complete (upcyclingStatus must be 'yes' or 'no')
  useEffect(() => {
    const { upcyclingStatus = '' } = disposalData
    const completed = upcyclingStatus === 'yes' || upcyclingStatus === 'no'
    setIsCompleted(completed)
    setStageCompleted(completed)
  }, [disposalData, setStageCompleted])

  return (
    <section className={`stage-column ${isCompleted ? 'completed' : ''}`}>
      {t.rich('stg-6-col', {
        h3: (chunks) => {
          const className = isCompleted ? 'completed' : ''
          return <h3 className={className}>{chunks}</h3>
        }
      })}
      <article className='scroll'>
        <div className='question-container'>
          {/* Upcycling Status (Yes/No) */}
          <div className='question-group'>
            <div className='question-row'>
              <label>{t('q19')}</label>
              <div className='radio-group'>
                <label>
                  <input
                    type='radio'
                    name='upcyclingStatus'
                    value='yes'
                    checked={disposalData.upcyclingStatus === 'yes'}
                    onChange={handleRadioChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type='radio'
                    name='upcyclingStatus'
                    value='no'
                    checked={disposalData.upcyclingStatus === 'no'}
                    onChange={handleRadioChange}
                  />
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Monthly Carbon Emissions Display */}
      <div className='carbon-summary'>
        <h4>{t('carbon-summary-title')}</h4>
        <p>{monthlyEmissions.toFixed(2)} kg CO₂</p>
      </div>
    </section>
  )
}
