import React, { useMemo } from 'react';

const CarbonReducingEmissions = ({
  productionData = {},
  transportData = {},
  processingData = {},
  extractionData = {},
  disposalData = {}
}) => {
  const calculations = useMemo(() => {
    // Get monthly coffee usage
    const monthlyUsage = productionData?.monthlyCoffeeUsage || 0;

    // Calculate user's total emissions per kg
    const userEmissionsPerKg = (
      (productionData?.carbonEmissionsPerKg || 0) +
      (transportData?.totalEmissions || 0) +
      (processingData?.totalEmissions || 0) +
      (extractionData?.totalEmissions || 0) +
      (disposalData?.totalEmissions || 0)
    );

    // Green coffee certified emissions per kg from PDF
    const greenCoffeeEmissionsPerKg = -1.28;

    // Calculate monthly emissions for both
    const userMonthlyEmissions = userEmissionsPerKg * monthlyUsage;
    const greenCoffeeMonthlyEmissions = greenCoffeeEmissionsPerKg * monthlyUsage;
    
    // Calculate reduction (user emissions - green coffee emissions)
    const monthlyReduction = userMonthlyEmissions - greenCoffeeMonthlyEmissions;

    return {
      monthlyReduction
    };
  }, [productionData, transportData, processingData, extractionData, disposalData]);

  return (
    <div>
      <div>{calculations.monthlyReduction.toFixed(2)} kg</div>
    </div>
  );
};

export default CarbonReducingEmissions;