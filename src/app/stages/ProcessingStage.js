'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ProcessingStage({
  processingData,
  setProcessingData,
  setStageCompleted
}) {
  const [monthlyEmissions, setMonthlyEmissions] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const t = useTranslations()

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    const parsedValue = parseFloat(value)
    setProcessingData((prevData) => ({
      ...prevData,
      [name]: parsedValue >= 0 ? parsedValue : 0 // Ensure non-negative
    }))
  }

  // Handle radio buttons
  const handleRadioChange = (e) => {
    const { name, value } = e.target
    setProcessingData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  /*
    ------------------------------------------------------
    Calculation Logic
    ------------------------------------------------------
    Electric: 
      final = [((A + D) * B) * 0.4951] / C
      where
        A = roasterPower (kW)
        D = smokeEliminatorPower (kW) or afterburnerPower (kW)
        B = usageTime (hr)
        C = productionQuantity (kg)

    Gas:
      final = (((B + E) * C * 0.4951) / D) + (A * 0.00157794)
      where
        A = gasConsumption (m³/hr)
        B = roasterPower (kW)
        E = smokeEliminatorPower (kW) or afterburnerPower (kW)
        C = usageTime (hr)
        D = productionQuantity (kg)
  */

  useEffect(() => {
    const {
      roasterType = '',
      roasterPower = 0,                // A (electric) or B (gas)
      usageTime = 0,                   // B (electric) or C (gas)
      productionQuantity = 0,          // C (electric) or D (gas)
      smokeEliminator = '',
      smokeEliminatorPower = 0,        // D (electric) or E (gas)
      gasConsumption = 0              // A (gas) in m³/hr
    } = processingData

    let emissions = 0

    if (roasterType === 'electric') {
      // [((roasterPower + smokeEliminatorPower) * usageTime) * 0.4951] / productionQuantity
      if (productionQuantity > 0) {
        emissions =
          ((roasterPower + smokeEliminatorPower) * usageTime * 0.4951) /
          productionQuantity
      }
    } else if (roasterType === 'gas') {
      // (((roasterPower + smokeEliminatorPower) * usageTime * 0.4951) / productionQuantity)
      // + (gasConsumption * 0.00157794)
      let electricPart = 0
      let gasPart = 0

      if (productionQuantity > 0) {
        electricPart =
          ((roasterPower + smokeEliminatorPower) * usageTime * 0.4951) /
          productionQuantity
      }
      // Gas consumption in m³/hr => multiply by the 0.00157794 factor
      gasPart = gasConsumption * 0.00157794

      emissions = electricPart + gasPart
    }

    setMonthlyEmissions(emissions)
  }, [processingData])

  /*
    ------------------------------------------------------
    Check if stage is complete
    ------------------------------------------------------
    You will want to adjust these conditions based on
    which fields are absolutely required vs. optional.
  */
  useEffect(() => {
    const {
      roasterType,
      roasterPower,
      usageTime,
      productionQuantity,
      gasConsumption,
      smokeEliminator,
      smokeEliminatorPower
    } = processingData

    let completed = false

    if (roasterType === 'electric') {
      // Must have roasterPower, usageTime, productionQuantity
      // If smokeEliminator/afterburner is in use, must have smokeEliminatorPower
      completed =
        roasterPower > 0 &&
        usageTime > 0 &&
        productionQuantity > 0 &&
        (smokeEliminator === 'notInUse' ||
          (smokeEliminatorPower > 0 && smokeEliminator !== 'notInUse'))
    } else if (roasterType === 'gas') {
      // Must have roasterPower, usageTime, productionQuantity, gasConsumption
      // If smokeEliminator/afterburner is in use, must have smokeEliminatorPower
      completed =
        roasterPower > 0 &&
        usageTime > 0 &&
        productionQuantity > 0 &&
        gasConsumption > 0 &&
        (smokeEliminator === 'notInUse' ||
          (smokeEliminatorPower > 0 && smokeEliminator !== 'notInUse'))
    }

    setIsCompleted(completed)
    setStageCompleted(completed)
  }, [processingData, setStageCompleted])

  return (
    <section className={`stage-column ${isCompleted ? 'completed' : ''}`}>
      {t.rich('stg-4-col', {
        h3: (chunks) => {
          const className = isCompleted ? 'completed' : ''
          return <h3 className={className}>{chunks}</h3>
        }
      })}
      <article className='scroll'>
        <div className='question-container'>
          {/* -------------------------------------
              Type of Roaster
          ------------------------------------- */}
          <div className='question-group'>
            <div className='question-row'>
              <label>{t('q6')}</label>
              <div className='radio-group'>
                <label>
                  <input
                    type='radio'
                    name='roasterType'
                    value='electric'
                    checked={processingData.roasterType === 'electric'}
                    onChange={handleRadioChange}
                  />
                  {t('Electric')}
                </label>
                <label>
                  <input
                    type='radio'
                    name='roasterType'
                    value='gas'
                    checked={processingData.roasterType === 'gas'}
                    onChange={handleRadioChange}
                  />
                  {t('Gas')}
                </label>
              </div>
            </div>
          </div>
          {/* -------------------------------------
              Roaster Power Consumption (kW)
              For both electric and gas roasters
          ------------------------------------- */}
          <div className='question-group'>
            <label>
              {t('roaster-power-label') /* e.g. "로스터기 소비전력 (kW)" */}
            </label>
            <input
              type='number'
              name='roasterPower'
              value={processingData.roasterPower || ''}
              onChange={handleInputChange}
              placeholder={t('input-default')}
            />
            <span className='unit'>kW</span>
          </div>
          {/* -------------------------------------
              If roasterType = gas => Gas Consumption
              (now in m³/hr, not kcal/hr)
          ------------------------------------- */}
          {processingData.roasterType === 'gas' && (
            <div className='question-group'>
              <label>{t('gasConsumption-label') /* e.g. "Gas (m³/hr)" */}</label>
              <div className='row-group'>
                <input
                  type='number'
                  name='gasConsumption'
                  value={processingData.gasConsumption || ''}
                  onChange={handleInputChange}
                  placeholder={t('input-default')}
                />
                <span className='unit'>m³/hr</span>
              </div>
            </div>
          )}
          {/* -------------------------------------
              Usage Time (hr)
              - For electric roaster, used in the formula
              - For gas roaster, also used
          ------------------------------------- */}
          <div className='question-group'>
            <label>{t('q9')}</label>
            <div className='row-group'>
              <input
                type='number'
                name='usageTime'
                value={processingData.usageTime || ''}
                onChange={handleInputChange}
                placeholder={t('input-default')}
              />
              <span className='unit'>hr</span>
            </div>
          </div>
          {/* -------------------------------------
              Production Quantity (kg)
          ------------------------------------- */}
          <div className='question-group'>
            <label>{t('q10')}</label>
            <div className='row-group'>
              <input
                type='number'
                name='productionQuantity'
                value={processingData.productionQuantity || ''}
                onChange={handleInputChange}
                placeholder={t('input-default')}
              />
              <span className='unit'>kg</span>
            </div>
          </div>
        </div>
        {/* -------------------------------------
            Smoke Eliminator / Afterburner / None
        ------------------------------------- */}
        <div className='question-group'>
          <label>{t('q11')}</label>
          <div className='radio-group trim-row'>
            <label className='trim-label'>
              <input
                type='radio'
                name='smokeEliminator'
                value='smokeEliminator'
                checked={processingData.smokeEliminator === 'smokeEliminator'}
                onChange={handleRadioChange}
                className='trim'
              />
              {t('smoke-elim')}
            </label>
            <label className='trim-label'>
              <input
                type='radio'
                name='smokeEliminator'
                value='afterburner'
                checked={processingData.smokeEliminator === 'afterburner'}
                onChange={handleRadioChange}
                className='trim'
              />
              {t('afterburner')}
            </label>
            <label className='trim-label'>
              <input
                type='radio'
                name='smokeEliminator'
                value='notInUse'
                checked={processingData.smokeEliminator === 'notInUse'}
                onChange={handleRadioChange}
                className='trim'
              />
              {t('not-in-use')}
            </label>
          </div>
        </div>

        {/* 
          If a smoke eliminator or afterburner is in use,
          show the power consumption. 
          For an electric roaster, hide any gas fields or usage-time
          for the eliminator if you wish (per your instructions).
        */}
        {processingData.smokeEliminator !== 'notInUse' && (
          <div className='question-group'>
            <label>
              {t('smokeEliminator-power-label') /* e.g. "Smoke Eliminator / Afterburner Power (kW)" */}
            </label>
            <div className='row-group'>
              <input
                type='number'
                name='smokeEliminatorPower'
                value={processingData.smokeEliminatorPower || ''}
                onChange={handleInputChange}
                placeholder={t('input-default')}
              />
              <span className='unit'>kW</span>
            </div>
          </div>
        )}

        {/* 
          Per instructions: 
          - If roasterType = 'electric', we remove/hide any
            fields for gas consumption or usage time on the smoke eliminator.
          - If roasterType = 'gas' but you do NOT want separate
            afterburner usage time or gas usage, you can remove them.
          - If you still want them, keep them, but re-label the unit carefully.
        */}
      </article>
      {/* -------------------------------------
          Monthly Carbon Emissions Display
      ------------------------------------- */}
      <div className='carbon-summary'>
        <h4>{t('carbon-summary-title')}</h4>
        <p>{monthlyEmissions.toFixed(2)} kg CO₂</p>
      </div>
    </section>
  )
}
