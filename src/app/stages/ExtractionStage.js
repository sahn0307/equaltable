'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ExtractionStage({
  extractionData,
  setExtractionData,
  setStageCompleted
}) {
  const [monthlyEmissions, setMonthlyEmissions] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const t = useTranslations()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setExtractionData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value) || 0
    }))
  }

  const handleRadioChange = (e) => {
    const { name, value } = e.target
    setExtractionData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  useEffect(() => {
    /*
      A = powerConsumption (kW)           // grinder
      B = usageTime (hr)                  // grinder
      C = productionQuantity (kg)         // grinder

      D = extractorPowerConsumption (kW)  // extractor
      E = extractorUsageTime (hr)         // extractor
      F = extractorProductionQuantity (kg)// extractor

      EF = 0.4915 (emission factor)
    */
    const {
      grinderType = '',
      powerConsumption = 0,            // was A
      usageTime = 0,                   // was B
      productionQuantity = 0,          // was C
      extractorPower = 'no',
      extractorPowerConsumption = 0,   // was D
      extractorUsageTime = 0,          // was E
      extractorProductionQuantity = 0  // was F
    } = extractionData

    // Define short variables for clarity:
    const A = powerConsumption
    const B = usageTime
    const C = productionQuantity
    const D = extractorPowerConsumption
    const E = extractorUsageTime
    const F = extractorProductionQuantity

    const EF = 0.4915
    let emissions = 0

    if (grinderType === 'electric') {
      if (extractorPower === 'yes') {
        // Electric + Extractor Yes
        // = (A * EF * B)/C + (D * EF * E)/F
        if (C > 0 && F > 0) {
          emissions = (A * EF * B) / C + (D * EF * E) / F
        } else if (C > 0) {
          // If F is zero/unset, do partial
          emissions = (A * EF * B) / C
        }
      } else {
        // Electric + Extractor No
        // = (A * EF * B)/C
        if (C > 0) {
          emissions = (A * EF * B) / C
        }
      }
    } else if (grinderType === 'manual') {
      // Manual grinder
      if (extractorPower === 'yes') {
        // Manual + Extractor Yes
        // = (D * EF * E)/F
        if (F > 0) {
          emissions = (D * EF * E) / F
        }
      } else {
        // Manual + Extractor No
        // = 0
        emissions = 0
      }
    }

    setMonthlyEmissions(emissions)
  }, [extractionData])

  useEffect(() => {
    const {
      grinderType,
      powerConsumption,
      usageTime,
      productionQuantity,
      extractorPower,
      extractorPowerConsumption,
      extractorUsageTime,
      extractorProductionQuantity
    } = extractionData

    let completed = false

    if (grinderType === 'electric') {
      if (powerConsumption > 0 && usageTime > 0 && productionQuantity > 0) {
        if (extractorPower === 'yes') {
          completed =
            extractorPowerConsumption > 0 &&
            extractorUsageTime > 0 &&
            extractorProductionQuantity > 0
        } else {
          completed = true
        }
      }
    } else if (grinderType === 'manual') {
      if (extractorPower === 'yes') {
        completed =
          extractorPowerConsumption > 0 &&
          extractorUsageTime > 0 &&
          extractorProductionQuantity > 0
      } else {
        completed = true
      }
    }

    setIsCompleted(completed)
    setStageCompleted(completed)
  }, [extractionData, setStageCompleted])

  return (
    <section className={`stage-column ${isCompleted ? 'completed' : ''}`}>
      {t.rich('stg-5-col', {
        h3: (chunks) => {
          const className = isCompleted ? 'completed' : ''
          return <h3 className={className}>{chunks}</h3>
        }
      })}

      <article className='scroll'>
        {/* Grinder Type */}
        <div className='question-group'>
          <div className='question-row'>
            <label>{t('q12')}</label>
            <div className='radio-group'>
              <label>
                <input
                  type='radio'
                  name='grinderType'
                  value='electric'
                  checked={extractionData.grinderType === 'electric'}
                  onChange={handleRadioChange}
                />
                {t('extract-el')}
              </label>
              <label>
                <input
                  type='radio'
                  name='grinderType'
                  value='manual'
                  checked={extractionData.grinderType === 'manual'}
                  onChange={handleRadioChange}
                />
                {t('Manual')}
              </label>
            </div>
          </div>
        </div>

        {/* Grinder Fields */}
        {extractionData.grinderType === 'electric' && (
          <>
            <div className='question-group'>
              <label>{t('q13')}</label>
              <div className='row-group'>
                <input
                  type='number'
                  name='powerConsumption'
                  value={extractionData.powerConsumption ?? 0}
                  onChange={handleInputChange}
                  placeholder={t('input-default')}
                />
                <span className='unit'>kW</span>
              </div>
            </div>

            <div className='question-group'>
              <label>{t('q14')}</label>
              <div className='row-group'>
                <input
                  type='number'
                  name='usageTime'
                  value={extractionData.usageTime ?? 0}
                  onChange={handleInputChange}
                  placeholder={t('input-default')}
                />
                <span className='unit'>hr</span>
              </div>
            </div>

            <div className='question-group'>
              <label>{t('q15')}</label>
              <div className='row-group'>
                <input
                  type='number'
                  name='productionQuantity'
                  value={extractionData.productionQuantity ?? 0}
                  onChange={handleInputChange}
                  placeholder={t('input-default')}
                />
                <span className='unit'>kg</span>
              </div>
            </div>
          </>
        )}

        {/* Extractor */}
        <div className='question-group'>
          <div className='question-row'>
            <label>{t('q16')}</label>
            <div className='radio-group'>
              <label>
                <input
                  type='radio'
                  name='extractorPower'
                  value='yes'
                  checked={extractionData.extractorPower === 'yes'}
                  onChange={handleRadioChange}
                />
                Yes
              </label>
              <label>
                <input
                  type='radio'
                  name='extractorPower'
                  value='no'
                  checked={extractionData.extractorPower === 'no'}
                  onChange={handleRadioChange}
                />
                No
              </label>
            </div>
          </div>
        </div>

        {extractionData.extractorPower === 'yes' && (
          <>
            <div className='question-group'>
              <label>{t('q17')}</label>
              <div className='row-group'>
                <input
                  type='number'
                  name='extractorPowerConsumption'
                  value={
                    extractionData.extractorPowerConsumption ?? 0
                  }
                  onChange={handleInputChange}
                  placeholder={t('input-default')}
                />
                <span className='unit'>kW</span>
              </div>
            </div>

            <div className='question-group'>
              <label>{t('extractorUsageTime-label')}</label>
              <div className='row-group'>
                <input
                  type='number'
                  name='extractorUsageTime'
                  value={extractionData.extractorUsageTime ?? 0}
                  onChange={handleInputChange}
                  placeholder={t('input-default')}
                />
                <span className='unit'>hr</span>
              </div>
            </div>

            <div className='question-group'>
              <label>{t('extractorProductionQty-label')}</label>
              <div className='row-group'>
                <input
                  type='number'
                  name='extractorProductionQuantity'
                  value={
                    extractionData.extractorProductionQuantity ?? 0
                  }
                  onChange={handleInputChange}
                  placeholder={t('input-default')}
                />
                <span className='unit'>kg</span>
              </div>
            </div>
          </>
        )}
      </article>

      <div className='carbon-summary'>
        <h4>{t('carbon-summary-title')}</h4>
        <p>{monthlyEmissions.toFixed(4)} kg CO₂</p>
      </div>
    </section>
  )
}
