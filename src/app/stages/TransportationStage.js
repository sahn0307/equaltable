'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function TransportationStage({
  transportData,
  setTransportData,
  setStageCompleted,
}) {
  const [monthlyEmissions, setMonthlyEmissions] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const t = useTranslations();

  // Set default values for transportType if not provided
  useEffect(() => {
    if (!transportData.transportType) {
      setTransportData((prevData) => ({
        ...prevData,
        transportType: {
          farmToPort: 'truck',
          portToDomestic: 'flight',
          domestic: 'truck',
        },
      }));
    }
  }, [transportData, setTransportData]);

  // Handle input changes for distances
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransportData((prevData) => ({
      ...prevData,
      [name]: value === '' ? '' : parseFloat(value), // Handle empty strings and valid numbers (including 0)
    }));
  };

  // Handle radio button changes for transport types
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setTransportData((prevData) => ({
      ...prevData,
      transportType: {
        ...prevData.transportType,
        [name]: value,
      },
    }));
  };

  const getSegmentEmissionFactor = (segment, type) => {
    if (segment === 'farmToPort') {
      switch (type) {
        case 'truck':
          return 0.1942;
        case 'train':
          return 0.0132;
        default:
          return 0;
      }
    } else if (segment === 'portToDomestic') {
      switch (type) {
        case 'flight':
          return 0.7971;
        case 'ship':
          return 0.00902;
        default:
          return 0;
      }
    } else if (segment === 'domestic') {
      switch (type) {
        case 'truck':
          return 0.1942;
        case 'train':
          return 0.03507;
        default:
          return 0;
      }
    }
    return 0;
  };

  // Calculate emissions and check completion
  useEffect(() => {
    const {
      farmToPortDistance,
      portToDomesticDistance,
      domesticDistance,
      transportType,
    } = transportData;

    const { farmToPort, portToDomestic, domestic } = transportType || {};

    const A =
      (farmToPortDistance || 0) *
      getSegmentEmissionFactor('farmToPort', farmToPort);
    const B =
      (portToDomesticDistance || 0) *
      getSegmentEmissionFactor('portToDomestic', portToDomestic);
    const C =
      (domesticDistance || 0) *
      getSegmentEmissionFactor('domestic', domestic);

    const totalEmissions = ((A + B + C) * 1.34) / 1000;
    setMonthlyEmissions(totalEmissions);

    // Check if all fields are completed
    const completed =
      farmToPortDistance !== '' &&
      farmToPortDistance !== null &&
      portToDomesticDistance !== '' &&
      portToDomesticDistance !== null &&
      domesticDistance !== '' &&
      domesticDistance !== null &&
      transportType?.farmToPort &&
      transportType?.portToDomestic &&
      transportType?.domestic;

    setIsCompleted(completed);
    setStageCompleted(completed);
  }, [transportData, setStageCompleted]);

  return (
    <section className={`stage-column ${isCompleted ? 'completed' : ''}`}>
      {t.rich('stg-3-col', {
        h3: (chunks) => {
          const className = isCompleted ? 'completed' : '';
          return <h3 className={className}>{chunks}</h3>;
        },
      })}
      <article className="scroll">
        {/* Farm to Port Distance */}
        <div className="question-group">
          <label>{t('q3')}</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="farmToPort"
                value="truck"
                checked={transportData.transportType?.farmToPort === 'truck'}
                onChange={handleRadioChange}
              />
              {t('truck')}
            </label>
            <label>
              <input
                type="radio"
                name="farmToPort"
                value="train"
                checked={transportData.transportType?.farmToPort === 'train'}
                onChange={handleRadioChange}
              />
              {t('train')}
            </label>
          </div>
          <div className="row-group">
            <input
              type="number"
              name="farmToPortDistance"
              placeholder={t('input-default')}
              value={transportData.farmToPortDistance ?? ''}
              onChange={handleInputChange}
            />
            <span className="unit">km</span>
          </div>
        </div>

        {/* Port to Domestic Ports/Airports Distance */}
        <div className="question-group">
          <label>{t('q4')}</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="portToDomestic"
                value="flight"
                checked={
                  transportData.transportType?.portToDomestic === 'flight'
                }
                onChange={handleRadioChange}
              />
              {t('flight')}
            </label>
            <label>
              <input
                type="radio"
                name="portToDomestic"
                value="ship"
                checked={transportData.transportType?.portToDomestic === 'ship'}
                onChange={handleRadioChange}
              />
              {t('ship')}
            </label>
          </div>
          <div className="row-group">
            <input
              type="number"
              name="portToDomesticDistance"
              value={transportData.portToDomesticDistance ?? ''}
              onChange={handleInputChange}
              placeholder={t('input-default')}
            />
            <span className="unit">km</span>
          </div>
        </div>

        {/* Domestic Distance to Roasting Factory */}
        <div className="question-group">
          <label>{t('q5')}</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="domestic"
                value="truck"
                checked={transportData.transportType?.domestic === 'truck'}
                onChange={handleRadioChange}
              />
              {t('truck')}
            </label>
            <label>
              <input
                type="radio"
                name="domestic"
                value="train"
                checked={transportData.transportType?.domestic === 'train'}
                onChange={handleRadioChange}
              />
              {t('train')}
            </label>
          </div>
          <div className="row-group">
            <input
              type="number"
              name="domesticDistance"
              value={transportData.domesticDistance ?? ''}
              onChange={handleInputChange}
              placeholder={t('input-default')}
            />
            <span className="unit">km</span>
          </div>
        </div>

        <div className="footnote">
          <p>{t('f-2')}</p>
          <br />
          <p>{t('f-2-2')}</p>
          <br />
          <br />
        </div>
        <a
          href="https://www.searates.com/distance-time"
          target="_blank"
          className="external-link"
        >
          {t('external-link')}
        </a>
        <br />
        <br />
        <br />
      </article>

      {/* Monthly Carbon Emissions Display */}
      <div className="carbon-summary">
        <h4>{t('carbon-summary-title')}</h4>
        <p>{monthlyEmissions.toFixed(2)} kg CO₂</p>
      </div>
    </section>
  );
}
