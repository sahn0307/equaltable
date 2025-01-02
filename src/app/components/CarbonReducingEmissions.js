import React, { useMemo } from 'react'

const CarbonReducingEmissions = ({
  productionData = {},
  transportData = {},
  processingData = {},
  extractionData = {},
  disposalData = {}
}) => {
  const calculations = useMemo(() => {
    // Get monthly coffee usage
    const monthlyUsage = productionData?.monthlyCoffeeUsage || 0

    // Calculate user's total emissions per kg
    const userEmissionsPerKg =
      (productionData?.carbonEmissionsPerKg || 0) +
      (transportData?.totalEmissions || 0) +
      (processingData?.totalEmissions || 0) +
      (extractionData?.totalEmissions || 0) +
      (disposalData?.totalEmissions || 0)

    // Calculate user's monthly emissions
    const userMonthlyEmissions = userEmissionsPerKg * monthlyUsage

    // A = [user’s monthly carbon emission - (1.28 * monthly coffee usage)]
    const A = userMonthlyEmissions - (1.28 * monthlyUsage)

    return { A }
  }, [
    productionData,
    transportData,
    processingData,
    extractionData,
    disposalData
  ])

  return <p>{calculations.A.toFixed(2)} kg</p>
}

export default CarbonReducingEmissions
