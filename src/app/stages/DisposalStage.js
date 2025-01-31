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

  // Radio button: upcyclingStatus => 'yes' or 'no'
  const handleRadioChange = (e) => {
    const { name, value } = e.target
    setDisposalData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  // Disposal factor input
  const handleInputChange = (e) => {
    const { name, value } = e.target
    const parsed = parseFloat(value)
    setDisposalData((prevData) => ({
      ...prevData,
      [name]: isNaN(parsed) ? '' : parsed // '' if not a number
    }))
  }

  // Calculate emissions
  useEffect(() => {
    const {
      upcyclingStatus = '',
      disposalFactor = 0.34 // default if empty
    } = disposalData

    let emissions = 0
    // If upcyclingStatus = 'no', use disposalFactor (could be negative, zero, or positive).
    // If 'yes', emissions = 0.
    if (upcyclingStatus === 'no') {
      emissions = disposalFactor !== '' ? disposalFactor : 0.34
    }

    setMonthlyEmissions(emissions)
  }, [disposalData])

  // Validate completion
  useEffect(() => {
    const { upcyclingStatus, disposalFactor } = disposalData

    // Must have chosen yes/no
    let valid = (upcyclingStatus === 'yes' || upcyclingStatus === 'no')

    // If 'no', we also require that disposalFactor is not an empty string
    // (But we allow negative or zero; we just need it to be a valid number)
    if (upcyclingStatus === 'no') {
      valid = valid && disposalFactor !== ''
    }

    setIsCompleted(valid)
    setStageCompleted(valid)
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
        {/* Upcycling Yes/No */}
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

        {/* Show disposalFactor if user selects "no" */}
        {disposalData.upcyclingStatus === 'no' && (
          <div className='question-group'>
            <label>{t('q20')}</label>
            <div className='row-group'>
              <input
                type='number'
                name='disposalFactor'
                value={
                  disposalData.disposalFactor === '' 
                    ? '' 
                    : disposalData.disposalFactor
                }
                onChange={handleInputChange}
                placeholder='0.34'
                // Note: no min, because negative is allowed
                step='0.01'
              />
              <span className='unit'>kg CO₂</span>
            </div>
          </div>
        )}
        <div className='footnote'>
          <br />
          <br />
          <br />
          <span className='bold'>{t('ref')}</span>
          <p>{t('ref-1')}</p>
          <br />
        </div>
      </article>

      {/* Carbon Emissions Summary */}
      <div className='carbon-summary'>
        <h4>{t('carbon-summary-title')}</h4>
        <p>{monthlyEmissions.toFixed(2)} kg CO₂</p>
      </div>
    </section>
  )
}
