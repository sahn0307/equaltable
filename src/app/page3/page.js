'use client';

import React from 'react';

export default function ReportPage({
    productionData,
    transportData,
    processingData,
    extractionData,
    disposalData,
}) {
    // Calculate emissions for each stage

    // Production stage emissions
    const productionEmissions =
        parseFloat(productionData?.emissions) || -2.69; // Default absorption value for farming stage

    // Transportation stage emissions
    const getTransportEmissionFactor = (type) => {
        switch (type) {
            case 'truck':
                return 0.1942; // kg CO₂ per km
            case 'train':
                return 0.04; // kg CO₂ per km
            case 'ship':
                return 0.00902; // kg CO₂ per km
            case 'flight':
                return 0.9; // kg CO₂ per km
            default:
                return 0;
        }
    };

    const transportEmissions =
        (parseFloat(transportData?.farmToPortDistance) || 0) *
            getTransportEmissionFactor(transportData?.transportType?.farmToPort) +
        (parseFloat(transportData?.portToDomesticDistance) || 0) *
            getTransportEmissionFactor(transportData?.transportType?.portToDomestic) +
        (parseFloat(transportData?.domesticDistance) || 0) *
            getTransportEmissionFactor(transportData?.transportType?.domestic);

    // Processing stage emissions
    const processingEmissions =
        ((parseFloat(processingData?.roasterPower) || 0) *
            (parseFloat(processingData?.usageTime) || 0) *
            0.495) / // kg CO₂ per kWh
        (parseFloat(processingData?.productionQuantity) || 1) + // Normalize per kg
        (parseFloat(processingData?.packagingWeight) || 0.0263) * 0.05; // Packaging emissions

    // Extraction stage emissions
    const extractionEmissions =
        (extractionData?.grinderType === 'electric'
            ? (parseFloat(extractionData?.powerConsumption) || 0) *
              (parseFloat(extractionData?.usageTime) || 0) *
              0.495
            : 0) +
        (extractionData?.extractorPower === 'yes'
            ? (parseFloat(extractionData?.extractorPowerConsumption) || 0) *
              (parseFloat(extractionData?.usageTime) || 0) *
              0.495
            : 0);

    // Disposal stage emissions
    const getDisposalEmissionFactor = (method) => {
        switch (method) {
            case 'landfill':
                return 0.4551;
            case 'incineration':
                return 1.182;
            case 'recycling':
                return 0.1;
            default:
                return 0;
        }
    };

    const disposalEmissions =
        (parseFloat(disposalData?.coffeeWasteEmissions) || 0.34) +
        (disposalData?.packagingUsed === 'yes'
            ? parseFloat(disposalData?.packagingEmissions) || 0.049
            : 0);

    // Total emissions calculation
    const totalEmissions =
        productionEmissions +
        transportEmissions +
        processingEmissions +
        extractionEmissions +
        disposalEmissions;

    // Reduction metrics
    const travelDistanceReduction = (totalEmissions * 16.04).toFixed(0); // Convert CO₂ to km
    const pineTreeReduction = (totalEmissions / 8.1).toFixed(0); // Convert CO₂ to pine trees

    return (
        <main className="container">
            {/* Header */}
            <header>
                <h1>Compare the Monthly Carbon Emissions of Coffee</h1>
                <p>
                    Check the monthly carbon emissions from the coffee you use and the
                    expected reduction when switching to carbon-reducing coffee.
                </p>
            </header>

            {/* Emission Overview */}
            <section className="overview">
                <div className="card">
                    <h3>Monthly Coffee Usage</h3>
                    <p>{parseFloat(productionData?.coffeeUsage) || 1} kg</p>
                </div>
                <div className="card">
                    <h3>Expected Monthly Carbon Emissions</h3>
                    <p>{totalEmissions.toFixed(2)} kg CO₂</p>
                </div>
                <div className="card">
                    <h3>Monthly Carbon Emissions (Reduction)</h3>
                    <p>{-1 * totalEmissions.toFixed(2)} kg CO₂</p>
                </div>
            </section>

            {/* Emission Rating */}
            <section className="rating">
                <h3>The Level of Carbon Emissions I Use</h3>
                <div className="grade">
                    <p>Grade D</p>
                    <p>{totalEmissions.toFixed(2)} kg CO₂</p>
                </div>
                <p>
                    This grade indicates that {totalEmissions.toFixed(2)} kg of carbon is
                    emitted per 1 kg of coffee beans.
                </p>
            </section>

            {/* Graph Section */}
            <section className="graph">
                <h3>Emission Distribution by Stages</h3>
                <div className="graph-container">
                    <ul>
                        <li>
                            Production Stage: {((productionEmissions / totalEmissions) * 100).toFixed(1)}%
                        </li>
                        <li>
                            Transportation Stage: {((transportEmissions / totalEmissions) * 100).toFixed(1)}%
                        </li>
                        <li>
                            Processing Stage: {((processingEmissions / totalEmissions) * 100).toFixed(1)}%
                        </li>
                        <li>
                            Extraction Stage: {((extractionEmissions / totalEmissions) * 100).toFixed(1)}%
                        </li>
                        <li>
                            Disposal Stage: {((disposalEmissions / totalEmissions) * 100).toFixed(1)}%
                        </li>
                    </ul>
                </div>
            </section>

            {/* Equivalent Reductions */}
            <section className="reduction">
                <div>
                    <h3>Equivalent Travel Distance for Carbon Emissions</h3>
                    <p>{travelDistanceReduction} km</p>
                </div>
                <div>
                    <h3>Equivalent Pine Trees</h3>
                    <p>{pineTreeReduction} pine trees</p>
                </div>
            </section>
        </main>
    );
}
