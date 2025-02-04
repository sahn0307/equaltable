import React, { useMemo } from 'react';
import { useEmissionsContext } from '../context/EmissionsContext';

const PineTreeEquivalent = React.memo(() => {
  const { productionData, calculateAllPerKg } = useEmissionsContext();
  const emissionsData = calculateAllPerKg(); // Retrieve emissions calculations

  const calculations = useMemo(() => {
    // Get monthly coffee usage
    const monthlyUsage = productionData?.monthlyCoffeeUsage || 0;

    // Green coffee reference emissions factor
    const greenCoffeeEmissions = -1.28;

    // Ensure totalPerKg is valid
    const totalPerKg = emissionsData?.totalPerKg || 0;

    // A = total emissions reduction (same as CarbonReducingEmissions)
    const A = (totalPerKg - greenCoffeeEmissions) * monthlyUsage;

    // C = A / 8.1 (Pine Tree Equivalency)
    const C = A / 8.1;

    return { C };
  }, [productionData, emissionsData]);

  return <>{Math.round(calculations.C).toLocaleString()}</>;
});

PineTreeEquivalent.displayName = 'PineTreeEquivalent';

export default PineTreeEquivalent;
