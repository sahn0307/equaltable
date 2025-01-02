import React, { useMemo } from 'react'

const TravelDistanceEquivalent = ({
  productionData = {},
  transportData = {},
  processingData = {},
  extractionData = {},
  disposalData = {}
}) => {
  const calculations = useMemo(() => {
    // 1) Calculate monthly reduction (A)
    const monthlyUsage = productionData?.monthlyCoffeeUsage || 0

    const userEmissionsPerKg =
      (productionData?.carbonEmissionsPerKg || 0) +
      (transportData?.totalEmissions || 0) +
      (processingData?.totalEmissions || 0) +
      (extractionData?.totalEmissions || 0) +
      (disposalData?.totalEmissions || 0)

    const userMonthlyEmissions = userEmissionsPerKg * monthlyUsage

    // Green coffee reference is -1.28 per kg
    const greenCoffeeMonthlyEmissions = -1.28 * monthlyUsage

    // A = userMonthlyEmissions - greenCoffeeMonthlyEmissions
    const A = userMonthlyEmissions - greenCoffeeMonthlyEmissions

    // 2) Convert to travel distance:
    // B = A * (16.04 * 2.097)
    const B = A * (16.04 * 2.097)

    return {
      equivalentDistance: B
    }
  }, [
    productionData,
    transportData,
    processingData,
    extractionData,
    disposalData
  ])

  // Display B as a whole number (rounded) + "km"
  return (
    <p>
      {Math.round(calculations.equivalentDistance).toLocaleString()} km
    </p>
  )
}

export default TravelDistanceEquivalent
