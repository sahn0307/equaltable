import React, { useMemo } from 'react';

const PineTreeEquivalent = ({
  productionData = {},
  transportData = {},
  processingData = {},
  extractionData = {},
  disposalData = {}
}) => {
  const calculations = useMemo(() => {
    // First calculate the emissions difference like in previous components
    const monthlyUsage = productionData?.monthlyCoffeeUsage || 0;
    
    const userEmissionsPerKg = (
      (productionData?.carbonEmissionsPerKg || 0) +
      (transportData?.totalEmissions || 0) +
      (processingData?.totalEmissions || 0) +
      (extractionData?.totalEmissions || 0) +
      (disposalData?.totalEmissions || 0)
    );

    const greenCoffeeEmissionsPerKg = -1.28;
    const userMonthlyEmissions = userEmissionsPerKg * monthlyUsage;
    const greenCoffeeMonthlyEmissions = greenCoffeeEmissionsPerKg * monthlyUsage;
    const monthlyReduction = userMonthlyEmissions - greenCoffeeMonthlyEmissions;

    // Convert to equivalent number of pine trees
    // From PDF: One 30-year-old pine tree absorbs 8.1 kg CO2 per year
    const annualReduction = monthlyReduction * 12; // Convert monthly to annual
    const equivalentTrees = annualReduction / 8.1;

    return {
      equivalentTrees
    };
  }, [productionData, transportData, processingData, extractionData, disposalData]);

  return (
    <div>
      <h3>What is the equivalent travel distance for carbon reduction?</h3>
      <div>{Math.round(calculations.equivalentTrees).toLocaleString()} pine trees</div>
    </div>
  );
};

export default PineTreeEquivalent;