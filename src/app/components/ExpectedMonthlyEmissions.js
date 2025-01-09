import React from 'react';
import { useEmissionsContext } from '../context/EmissionsContext';

const ExpectedMonthlyEmissions = () => {
  const { productionData, calculateAllPerKg } = useEmissionsContext();
  const { totalPerKg } = calculateAllPerKg();

  // multiply totalPerKg by monthlyCoffeeUsage for monthly total
  const monthlyUsage = productionData?.monthlyCoffeeUsage || 0;
  const monthlyEmissions = monthlyUsage * totalPerKg;

  return (
    <>
      {monthlyEmissions.toFixed(2)} kg
    </>
  );
};

export default ExpectedMonthlyEmissions;
