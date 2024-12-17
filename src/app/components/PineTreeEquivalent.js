import React, { useMemo } from 'react'

const PineTreeEquivalent = React.memo(({
    productionData = {},
    transportData = {},
    processingData = {},
    extractionData = {},
    disposalData = {}
}) => {
    const calculations = useMemo(() => {
        const monthlyUsage = productionData?.monthlyCoffeeUsage || 0
        const userEmissionsPerKg =
            (productionData?.carbonEmissionsPerKg || 0) +
            (transportData?.totalEmissions || 0) +
            (processingData?.totalEmissions || 0) +
            (extractionData?.totalEmissions || 0) +
            (disposalData?.totalEmissions || 0)

        const greenCoffeeEmissionsPerKg = -1.28
        const userMonthlyEmissions = userEmissionsPerKg * monthlyUsage
        const greenCoffeeMonthlyEmissions = greenCoffeeEmissionsPerKg * monthlyUsage
        const monthlyReduction = userMonthlyEmissions - greenCoffeeMonthlyEmissions
        const annualReduction = monthlyReduction * 12
        const equivalentTrees = annualReduction / 8.1

        return { equivalentTrees }
    }, [productionData, transportData, processingData, extractionData, disposalData])

    return <>{Math.round(calculations.equivalentTrees).toLocaleString()}</>
})

PineTreeEquivalent.displayName = 'PineTreeEquivalent'

export default PineTreeEquivalent