// src/app/stages/EmissionSummary.js
'use client'

export default function EmissionSummary({
	productionData,
	transportData,
	processingData,
	extractionData,
	disposalData
}) {
	// Production emissions are static for simplicity
	const productionEmissions = 1.64

	// Transportation emissions calculation based on distances and transport type
	const getTransportEmissionFactor = (type) => {
		switch (type) {
			case 'truck':
				return 0.2 // kg CO₂ per km
			case 'train':
				return 0.1 // kg CO₂ per km
			case 'ship':
				return 0.015 // kg CO₂ per km
			case 'flight':
				return 0.9 // kg CO₂ per km
			default:
				return 0
		}
	}

	const transportEmissions =
		(parseFloat(transportData?.farmToPortDistance) *
			getTransportEmissionFactor(
				transportData?.transportType?.farmToPort
			) || 0) +
		(parseFloat(transportData?.portToDomesticDistance) *
			getTransportEmissionFactor(
				transportData?.transportType?.portToDomestic
			) || 0) +
		(parseFloat(transportData?.domesticDistance) *
			getTransportEmissionFactor(
				transportData?.transportType?.domestic
			) || 0)

	// Processing emissions calculation based on power consumption and gas usage
	const processingEmissions =
		(parseFloat(processingData?.powerConsumption) *
			parseFloat(processingData?.usageTime) || 0) *
			0.495 + // Electric energy emissions
		(parseFloat(processingData?.gasConsumption) *
			parseFloat(processingData?.usageTime) || 0) *
			0.23 // Gas energy emissions

	// Extraction emissions calculation
	const extractionEmissions =
		(extractionData?.grinderType === 'electric'
			? parseFloat(extractionData?.powerConsumption) *
			  parseFloat(extractionData?.usageTime) *
			  0.495
			: 0) +
		(extractionData?.extractorPower === 'yes'
			? parseFloat(extractionData?.extractorPowerConsumption) *
			  parseFloat(extractionData?.usageTime) *
			  0.495
			: 0)

	// Disposal emissions calculation based on disposal methods
	const getDisposalEmissionFactor = (method) => {
		switch (method) {
			case 'landfill':
				return 0.455 // kg CO₂ per kg of waste
			case 'incineration':
				return 1.182 // kg CO₂ per kg of waste
			case 'recycling':
				return 0.1 // kg CO₂ per kg of waste
			default:
				return 0
		}
	}

	const disposalEmissions =
		parseFloat(disposalData?.wasteMass) *
			getDisposalEmissionFactor(disposalData?.disposalMethod) || 0

	// Calculate total emissions
	const totalEmissions =
		productionEmissions +
		transportEmissions +
		processingEmissions +
		extractionEmissions +
		disposalEmissions

	return (
		<div>
			<h2>Summary of Emissions</h2>

			<div>
				<h3>Production Stage:</h3>
				<p>Emissions: {productionEmissions.toFixed(2)} kg CO₂</p>
			</div>

			<div>
				<h3>Transportation Stage:</h3>
				<p>Emissions: {transportEmissions.toFixed(2)} kg CO₂</p>
			</div>

			<div>
				<h3>Processing Stage:</h3>
				<p>Emissions: {processingEmissions.toFixed(2)} kg CO₂</p>
			</div>

			<div>
				<h3>Extraction Stage:</h3>
				<p>Emissions: {extractionEmissions.toFixed(2)} kg CO₂</p>
			</div>

			<div>
				<h3>Disposal Stage:</h3>
				<p>Emissions: {disposalEmissions.toFixed(2)} kg CO₂</p>
			</div>

			<div>Total Emissions: {totalEmissions.toFixed(2)} kg CO₂</div>
		</div>
	)
}
