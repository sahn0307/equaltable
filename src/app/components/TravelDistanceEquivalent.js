import React, { useMemo } from 'react'

const TravelDistanceEquivalent = ({
	productionData = {},
	transportData = {},
	processingData = {},
	extractionData = {},
	disposalData = {}
}) => {
	const calculations = useMemo(() => {
		// First calculate the emissions difference like in the first component
		const monthlyUsage = productionData?.monthlyCoffeeUsage || 0

		const userEmissionsPerKg =
			(productionData?.carbonEmissionsPerKg || 0) +
			(transportData?.totalEmissions || 0) +
			(processingData?.totalEmissions || 0) +
			(extractionData?.totalEmissions || 0) +
			(disposalData?.totalEmissions || 0)

		const greenCoffeeEmissionsPerKg = -1.28
		const userMonthlyEmissions = userEmissionsPerKg * monthlyUsage
		const greenCoffeeMonthlyEmissions =
			greenCoffeeEmissionsPerKg * monthlyUsage
		const monthlyReduction =
			userMonthlyEmissions - greenCoffeeMonthlyEmissions

		// Convert to travel distance
		// From PDF: 16.04 km/L for gasoline vehicles and 2.097 kgCO2/L
		const kmPerKgCO2 = 16.04 / 2.097
		const equivalentDistance = monthlyReduction * kmPerKgCO2

		return {
			equivalentDistance
		}
	}, [
		productionData,
		transportData,
		processingData,
		extractionData,
		disposalData
	])

	return (
		<p>{Math.round(calculations.equivalentDistance).toLocaleString()} km</p>
	)
}

export default TravelDistanceEquivalent
