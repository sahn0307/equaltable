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
      const greenCoffeeEmissions = -1.28;
      const monthlyReduction = (emissionsPerKg - greenCoffeeEmissions) * monthlyUsage;
  
      // Calculate normalized angle for the gauge
      const MIN_EMISSIONS = -30;
      const MAX_EMISSIONS = 30;
      const normalizedEmissions = Math.min(Math.max(emissionsPerKg, MIN_EMISSIONS), MAX_EMISSIONS);
      const normalizedAngle = ((normalizedEmissions - MIN_EMISSIONS) / (MAX_EMISSIONS - MIN_EMISSIONS)) * 180;
  
      // Calculate grade and color
      let grade;
      let color;
      if (emissionsPerKg <= 0) {
        grade = 'A';
        color = '#4ade80'; // green
      } else if (emissionsPerKg <= 2.3) {
        grade = 'B';
        color = '#fbbf24'; // yellow
      } else if (emissionsPerKg <= 16) {
        grade = 'C';
        color = '#fb923c'; // orange
      } else {
        grade = 'D';
        color = '#ef4444'; // red
      }
  
      return {
        normalizedAngle,
        grade,
        color,
        emissionsPerKg,
        monthlyReduction
      };
    }, [productionData, transportData, processingData, extractionData, disposalData]);
  
    // SVG arc calculation functions
    const describeArc = (x, y, radius, startAngle, endAngle) => {
      const start = {
        x: x + radius * Math.cos(Math.PI * (startAngle / 180)),
        y: y + radius * Math.sin(Math.PI * (startAngle / 180))
      };
      
      const end = {
        x: x + radius * Math.cos(Math.PI * (endAngle / 180)),
        y: y + radius * Math.sin(Math.PI * (endAngle / 180))
      };
  
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
      return [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
      ].join(" ");
    };
  
    return (
      <div className='card col1-gague'>
        <h5>{t('col1-2-h')}</h5>
        
        {/* Gauge SVG */}
        <div style={{ position: 'relative', width: '300px', height: '200px', margin: '0 auto' }}>
          <svg viewBox="0 0 300 200">
            {/* Background arc */}
            <path
              d={describeArc(150, 100, 80, 180, 0)}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="20"
            />
            
            {/* Filled arc based on value */}
            <path
              d={describeArc(150, 100, 80, 180, 0 - calculations.normalizedAngle)}
              fill="none"
              stroke={calculations.color}
              strokeWidth="20"
            />
            
            {/* Scale labels */}
            <text x="40" y="100" textAnchor="middle" fill="#6b7280">-30</text>
            <text x="150" y="10" textAnchor="middle" fill="#6b7280">0</text>
            <text x="260" y="100" textAnchor="middle" fill="#6b7280">30</text>
            
            {/* Grade and emissions display */}
            <text x="150" y="90" textAnchor="middle" fontSize="24" fontWeight="bold">
              Grade {calculations.grade}
            </text>
            <text x="150" y="120" textAnchor="middle" fontSize="18">
              {calculations.emissionsPerKg.toFixed(2)}kg
            </text>
          </svg>
        </div>
  
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
  
        <p className='grade'>
          {t.rich('gague-grade', {
            br: () => <br />,
            emissions: calculations.emissionsPerKg.toFixed(2),
            reduction: Math.abs(calculations.monthlyReduction).toFixed(2)
          })}
        </p>
  
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