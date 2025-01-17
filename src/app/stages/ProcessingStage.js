'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ProcessingStage({
  processingData,
  setProcessingData,
  setStageCompleted,
}) {
  const [monthlyEmissions, setMonthlyEmissions] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const t = useTranslations();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProcessingData((prevData) => ({
      ...prevData,
      [name]: value === '' ? '' : parseFloat(value), // Treat empty string as '' and valid numbers (including 0) as is
    }));
  };

  // Handle radio button changes
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setProcessingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Calculate monthly emissions
  useEffect(() => {
    const {
      roasterType,
      roasterPower = 0,
      gasConsumption = 0,
      usageTime = 0,
      productionQuantity = 1,
      smokeEliminator,
      smokeEliminatorPowerConsumption = 0,
    } = processingData;

    let emissions = 0;

    if (roasterType === 'electric') {
      if (productionQuantity > 0) {
        emissions =
          ((roasterPower || 0) + (smokeEliminatorPowerConsumption || 0)) *
          (usageTime || 0) *
          0.4951 /
          productionQuantity;
      }
    } else if (roasterType === 'gas') {
      let electricPart = 0;
      let gasPart = 0;

      if (productionQuantity > 0) {
        electricPart =
          ((roasterPower || 0) + (smokeEliminatorPowerConsumption || 0)) *
          (usageTime || 0) *
          0.4951 /
          productionQuantity;
      }
      gasPart = (gasConsumption || 0) * 0.00157794;

      emissions = electricPart + gasPart;
    }

    setMonthlyEmissions(emissions);
  }, [processingData]);

  // Check if all required fields are completed
  useEffect(() => {
    const {
      roasterType,
      roasterPower,
      usageTime,
      productionQuantity,
      gasConsumption,
      smokeEliminator,
      smokeEliminatorPowerConsumption,
    } = processingData;

    let completed = false;

    if (roasterType === 'electric') {
      completed =
        roasterPower !== '' &&
        roasterPower !== null && // Explicitly check for null or empty
        usageTime !== '' &&
        usageTime !== null &&
        productionQuantity >= 0 &&
        (smokeEliminator === 'notInUse' ||
          (smokeEliminatorPowerConsumption !== '' &&
            smokeEliminatorPowerConsumption !== null));
    } else if (roasterType === 'gas') {
      completed =
        roasterPower !== '' &&
        roasterPower !== null &&
        usageTime !== '' &&
        usageTime !== null &&
        productionQuantity >= 0 &&
        gasConsumption !== '' &&
        gasConsumption !== null &&
        (smokeEliminator === 'notInUse' ||
          (smokeEliminatorPowerConsumption !== '' &&
            smokeEliminatorPowerConsumption !== null));
    }

    setIsCompleted(completed);
    setStageCompleted(completed);
  }, [processingData, setStageCompleted]);

  return (
    <section className={`stage-column ${isCompleted ? 'completed' : ''}`}>
      {t.rich('stg-4-col', {
        h3: (chunks) => {
          const className = isCompleted ? 'completed' : '';
          return <h3 className={className}>{chunks}</h3>;
        },
      })}
      <article className="scroll">
        {/* Roaster Type */}
        <div className="question-group">
          <label>{t('q6')}</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="roasterType"
                value="electric"
                checked={processingData.roasterType === 'electric'}
                onChange={handleRadioChange}
              />
              {t('Electric')}
            </label>
            <label>
              <input
                type="radio"
                name="roasterType"
                value="gas"
                checked={processingData.roasterType === 'gas'}
                onChange={handleRadioChange}
              />
              {t('Gas')}
            </label>
          </div>
        </div>

        {/* Roaster Power Consumption */}
        <div className="question-group">
          <label>{t('roaster-power-label')}</label>
          <div className="row-group">
            <input
              type="number"
              name="roasterPower"
              value={processingData.roasterPower ?? ''} // Use nullish coalescing to handle undefined/null
              onChange={handleInputChange}
              placeholder={t('input-default')}
            />
            <span className="unit">kW</span>
          </div>
        </div>

        {/* Gas Consumption for Gas Roasters */}
        {processingData.roasterType === 'gas' && (
          <div className="question-group">
            <label>{t('gasConsumption-label')}</label>
            <div className="row-group">
              <input
                type="number"
                name="gasConsumption"
                value={processingData.gasConsumption ?? ''}
                onChange={handleInputChange}
                placeholder={t('input-default')}
              />
              <span className="unit">m³/hr</span>
            </div>
          </div>
        )}

        {/* Usage Time */}
        <div className="question-group">
          <label>{t('q9')}</label>
          <div className="row-group">
            <input
              type="number"
              name="usageTime"
              value={processingData.usageTime ?? ''}
              onChange={handleInputChange}
              placeholder={t('input-default')}
            />
            <span className="unit">hr</span>
          </div>
        </div>

        {/* Production Quantity */}
        <div className="question-group">
          <label>{t('q10')}</label>
          <div className="row-group">
            <input
              type="number"
              name="productionQuantity"
              value={processingData.productionQuantity ?? ''}
              onChange={handleInputChange}
              placeholder={t('input-default')}
            />
            <span className="unit">kg</span>
          </div>
        </div>

        {/* Smoke Eliminator Options */}
        <div className="question-group">
          <label>{t('q11')}</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="smokeEliminator"
                value="smokeEliminator"
                checked={processingData.smokeEliminator === 'smokeEliminator'}
                onChange={handleRadioChange}
              />
              {t('smoke-elim')}
            </label>
            <label>
              <input
                type="radio"
                name="smokeEliminator"
                value="afterburner"
                checked={processingData.smokeEliminator === 'afterburner'}
                onChange={handleRadioChange}
              />
              {t('afterburner')}
            </label>
            <label>
              <input
                type="radio"
                name="smokeEliminator"
                value="notInUse"
                checked={processingData.smokeEliminator === 'notInUse'}
                onChange={handleRadioChange}
              />
              {t('not-in-use')}
            </label>
          </div>
        </div>

        {/* Smoke Eliminator Power */}
        {processingData.smokeEliminator !== 'notInUse' && (
          <div className="question-group">
            <label>{t('smokeEliminator-power-label')}</label>
            <div className="row-group">
              <input
                type="number"
                name="smokeEliminatorPowerConsumption"
                value={processingData.smokeEliminatorPowerConsumption ?? ''}
                onChange={handleInputChange}
                placeholder={t('input-default')}
              />
              <span className="unit">kW</span>
            </div>
          </div>
        )}
      </article>

      {/* Carbon Emissions Summary */}
      <div className="carbon-summary">
        <h4>{t('carbon-summary-title')}</h4>
        <p>{monthlyEmissions.toFixed(2)} kg CO₂</p>
      </div>
    </section>
  );
}
