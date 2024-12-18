import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

const EmissionsGauge = ({
    productionData = {},
    transportData = {},
    processingData = {},
    extractionData = {},
    disposalData = {},
    chevronImage
  }) => {
    const t = useTranslations();
  
    const calculations = useMemo(() => {
      // Calculate total emissions per kg
      const emissionsPerKg = (
        (productionData?.carbonEmissionsPerKg || 0) +
        (transportData?.totalEmissions || 0) +
        (processingData?.totalEmissions || 0) +
        (extractionData?.totalEmissions || 0) +
        (disposalData?.totalEmissions || 0)
      );
  
      // Calculate monthly usage and potential reduction
      const monthlyUsage = productionData?.monthlyCoffeeUsage || 0;
      const greenCoffeeEmissions = -1.28; // From certificate
      const monthlyReduction = (emissionsPerKg - greenCoffeeEmissions) * monthlyUsage;
  
      // Calculate normalized position (-30 to 30 scale)
      const MIN_EMISSIONS = -30;
      const MAX_EMISSIONS = 30;
      const normalizedPosition = Math.min(Math.max(
        ((emissionsPerKg - MIN_EMISSIONS) / (MAX_EMISSIONS - MIN_EMISSIONS)) * 100,
        0
      ), 100);
  
      // Calculate grade
      let grade;
      if (emissionsPerKg <= 0) {
        grade = 'A';
      } else if (emissionsPerKg <= 2.3) {
        grade = 'B';
      } else if (emissionsPerKg <= 16) {
        grade = 'C';
      } else {
        grade = 'D';
      }
  
      return {
        normalizedPosition,
        grade,
        emissionsPerKg,
        monthlyReduction
      };
    }, [productionData, transportData, processingData, extractionData, disposalData]);
  
    return (
      <div className='card col1-gague'>
        <h5>{t('col1-2-h')}</h5>
        <div className='gauge-container'>
          <div className='gauge'>
            <div
              className='gauge-pointer'
              style={{
                left: `${calculations.normalizedPosition}%`
              }}
            />
          </div>
          <div className='gauge-labels'>
            <span>-30</span>
            <span>30</span>
          </div>
        </div>
        <p className='grade'>
          {t.rich('gague-grade', {
            br: () => <br />,
            emissions: calculations.emissionsPerKg.toFixed(2),
            reduction: Math.abs(calculations.monthlyReduction).toFixed(2)
          })}
        </p>
        <div className='key'>
          <p className='k-title'>
            {t.rich('gague-key-h', {
              br: () => <br />
            })}
          </p>
          <p>
            {t.rich('gague-key', {
              br: () => <br />
            })}
          </p>
        </div>
        <p className='page-link'>
          <Link href='/page4'>{t('p4-link')}</Link>
          {chevronImage && (
            <Image
              src={chevronImage}
              width={4}
              height={8}
              alt='chevron icon'
            />
          )}
        </p>
      </div>
    );
  };
  
  export default EmissionsGauge;