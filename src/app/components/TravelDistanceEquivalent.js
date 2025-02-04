import React, { useMemo } from 'react';
import { useEmissionsContext } from '../context/EmissionsContext';

const TravelDistanceEquivalent = () => {
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

    // B = A * (16.04 / 2.097) -> Corrected formula
    const B = (A * 16.04) / 2.097;

    return { equivalentDistance: B };
  }, [productionData, emissionsData]);

  return <p>{Math.round(calculations.equivalentDistance).toLocaleString()} km</p>;
};

export default TravelDistanceEquivalent;
