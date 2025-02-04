import React, { useMemo } from 'react';
import { useEmissionsContext } from '../context/EmissionsContext';

const CarbonReducingEmissions = () => {
  const { productionData, calculateAllPerKg } = useEmissionsContext();
  const emissionsData = calculateAllPerKg(); // Retrieve emissions calculations

  const calculations = useMemo(() => {
    // Get monthly coffee usage
    const monthlyUsage = productionData?.monthlyCoffeeUsage || 0;
    
    // Green coffee baseline emissions factor
    const greenCoffeeEmissions = -1.28;

    // Ensure totalPerKg is valid
    const totalPerKg = emissionsData?.totalPerKg || 0;

    // Calculate monthly reduction using correct formula
    const monthlyReduction = (totalPerKg - greenCoffeeEmissions) * monthlyUsage;

    return { monthlyReduction };
  }, [productionData, emissionsData]);

  return <p>{calculations.monthlyReduction.toFixed(2)} kg</p>;
};

export default CarbonReducingEmissions;
