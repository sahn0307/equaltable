import React, { useMemo } from 'react';

const ExpectedMonthlyEmissions = ({
  productionData = {},
  transportData = {},
  processingData = {},
  extractionData = {},
  disposalData = {}
}) => {
  const calculations = useMemo(() => {
    // Get monthly coffee usage
    const monthlyUsage = productionData?.monthlyCoffeeUsage || 0;

    // Calculate total emissions per kg
    const emissionsPerKg = (
      (productionData?.carbonEmissionsPerKg || 0) +
      (transportData?.totalEmissions || 0) +
      (processingData?.totalEmissions || 0) +
      (extractionData?.totalEmissions || 0) +
      (disposalData?.totalEmissions || 0)
    );

    // Calculate total monthly emissions
    const monthlyEmissions = monthlyUsage * emissionsPerKg;

    return {
      monthlyEmissions
    };
  }, [productionData, transportData, processingData, extractionData, disposalData]);

  return (
    <>
      {calculations.monthlyEmissions.toFixed(2)} kg
    </>
  );
};

export default ExpectedMonthlyEmissions;