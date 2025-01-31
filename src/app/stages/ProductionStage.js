'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ProductionStage({
  productionData,
  setProductionData,
  setStageCompleted
}) {
  const [isCompleted, setIsCompleted] = useState(true)
  const t = useTranslations()

  const DEFAULT_EMISSIONS = 1.56

  // Set default value for carbonEmissionsPerKg
  useEffect(() => {
    if (productionData.carbonEmissionsPerKg == null) {
      setProductionData((prevData) => ({
        ...prevData,
        carbonEmissionsPerKg: DEFAULT_EMISSIONS
      }))
    }
  }, [productionData.carbonEmissionsPerKg, setProductionData])

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target

    // Allow empty, "-", or "-." values temporarily
    if (value === '' || value === '-' || value === '-.' || value === '.') {
      setProductionData((prevData) => ({
        ...prevData,
        [name]: value // Temporarily store as a string
      }))
      return
    }

    // Allow only valid numeric inputs, prevent multiple decimals
    if (/^-?\d*\.?\d*$/.test(value)) {
      setProductionData((prevData) => ({
        ...prevData,
        [name]: value // Store as a string temporarily
      }))
    }
  }

  // Convert to number when input loses focus (onBlur event)
  const handleBlur = (e) => {
    const { name, value } = e.target
    const parsedValue = parseFloat(value)

    setProductionData((prevData) => ({
      ...prevData,
      [name]: isNaN(parsedValue) ? DEFAULT_EMISSIONS : parsedValue
    }))
  }

  // Check if field is filled out
  useEffect(() => {
    const { carbonEmissionsPerKg } = productionData

    // Since 0 or negative is allowed, we only check if it's a valid number (not NaN or undefined)
    const isNumber = typeof carbonEmissionsPerKg === 'number' && !isNaN(carbonEmissionsPerKg)

    setIsCompleted(isNumber)
    setStageCompleted(isNumber)
  }, [productionData, setStageCompleted])

  return (
    <section className={`stage-column ${isCompleted ? 'completed' : ''}`}>
      {t.rich('stg-2-col', {
        h3: (chunks) => {
          const className = isCompleted ? 'completed' : ''
          return <h3 className={className}>{chunks}</h3>
        }
      })}
      <article className='scroll'>
        {/* Carbon Emissions from Farm */}
        <div className='question-group'>
          <label>{t('q2')}</label>
          <div className='row-group'>
            <input
              type='text' // Allow decimals and "-"
              name='carbonEmissionsPerKg'
              placeholder={t('input-default')}
              value={productionData.carbonEmissionsPerKg ?? ''}
              onChange={handleInputChange}
              onBlur={handleBlur} // Convert to number when focus is lost
            />
            <span className='unit'>kg</span>
          </div>
        </div>
        <div className='footnote'>
          <p>{t('f-1')}</p>
          <br />
          <br />
          <br />
          <span className='bold'>{t('ref')}</span>
          <p>{t('ref-1')}</p>
          <br />
          <p>{t('ref-2')}</p>
        </div>
      </article>

      {/* Per kg Carbon Emissions Display */}
      <div className='carbon-summary'>
        <h4>{t('carbon-summary-title')}</h4>
        <p>
          {(() => {
            const value = parseFloat(productionData.carbonEmissionsPerKg);
            return isNaN(value) ? DEFAULT_EMISSIONS.toFixed(2) : value.toFixed(2);
          })()} kg CO₂
        </p>

      </div>
    </section>
  )
}
