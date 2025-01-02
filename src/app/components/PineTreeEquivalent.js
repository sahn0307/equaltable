import React, { useMemo } from 'react'

const PineTreeEquivalent = React.memo(({
  productionData = {},
  transportData = {},
  processingData = {},
  extractionData = {},
  disposalData = {}
}) => {
  const calculations = useMemo(() => {
    // monthlyUsage = monthly coffee usage in kg
    const monthlyUsage = productionData?.monthlyCoffeeUsage || 0

    // Sum of user emissions per kg
    const userEmissionsPerKg =
      (productionData?.carbonEmissionsPerKg || 0) +
      (transportData?.totalEmissions || 0) +
      (processingData?.totalEmissions || 0) +
      (extractionData?.totalEmissions || 0) +
      (disposalData?.totalEmissions || 0)

    // Convert user emissions to monthly total
    const userMonthlyEmissions = userEmissionsPerKg * monthlyUsage

    // Green coffee reference: -1.28 per kg
    const greenCoffeeMonthlyEmissions = -1.28 * monthlyUsage

    // A = user’s monthly difference
    const A = userMonthlyEmissions - greenCoffeeMonthlyEmissions

    // C = A / 8.1
    const C = A / 8.1

    return { C }
  }, [
    productionData,
    transportData,
    processingData,
    extractionData,
    disposalData
  ])

  return <>{Math.round(calculations.C).toLocaleString()}</>
})

PineTreeEquivalent.displayName = 'PineTreeEquivalent'

export default PineTreeEquivalent
