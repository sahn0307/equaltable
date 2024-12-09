'use client';

import { useEmissionsContext } from '../../context/EmissionsContext'; // Access the context

export default function Page3() {
    const {
        productionData,
        transportData,
        processingData,
        extractionData,
        disposalData,
    } = useEmissionsContext(); // Access the context data

    // Calculate total emissions
    const totalEmissions = (() => {
        const productionEmissions = productionData.carbonEmissionsPerKg || 0;
        const transportEmissions =
            (transportData.farmToPortDistance * 0.2 || 0) + // Truck
            (transportData.portToDomesticDistance * 0.015 || 0) + // Ship
            (transportData.domesticDistance * 0.2 || 0); // Truck
        const processingEmissions =
            (processingData.roasterType === 'electric'
                ? (processingData.powerConsumption || 0) *
                  (processingData.usageTime || 0) *
                  0.495
                : (processingData.gasConsumption || 0) *
                  (processingData.usageTime || 0) *
                  0.23) || 0;
        const extractionEmissions =
            (extractionData.grinderType === 'electric'
                ? (extractionData.powerConsumption || 0) *
                  (extractionData.usageTime || 0) *
                  0.495
                : 0) +
            (extractionData.extractorPower === 'yes'
                ? (extractionData.extractorPowerConsumption || 0) *
                  (extractionData.usageTime || 0) *
                  0.495
                : 0);
        const disposalEmissions =
            (disposalData.wasteMass || 0) * 0.455 + // Landfill
            (disposalData.packagingType === 'LDPE' ? 0.049 : 0); // Packaging emissions
        return (
            productionEmissions +
            transportEmissions +
            processingEmissions +
            extractionEmissions +
            disposalEmissions
        );
    })();

    return (
        <div className="centered-wrapper">
            <div className="page-header">
                <h2>Compare the Monthly Carbon Emissions of Your Coffee</h2>
                <p>
                    Check the carbon emissions of your coffee and compare them to
                    carbon-reducing coffee.
                </p>
            </div>
            <div className="report">
                {/* Carbon Emissions Report */}
                <div>
                    <h3>Total Carbon Emissions:</h3>
                    <p>{totalEmissions.toFixed(2)} kg CO₂</p>
                </div>
                <div>
                    <h4>Production Stage:</h4>
                    <p>{productionData.carbonEmissionsPerKg.toFixed(2)} kg CO₂</p>
                </div>
                <div>
                    <h4>Transportation Stage:</h4>
                    <p>
                        {(transportData.farmToPortDistance * 0.2 +
                            transportData.portToDomesticDistance * 0.015 +
                            transportData.domesticDistance * 0.2).toFixed(2)}{' '}
                        kg CO₂
                    </p>
                </div>
                <div>
                    <h4>Processing Stage:</h4>
                    <p>
                        {(
                            (processingData.roasterType === 'electric'
                                ? processingData.powerConsumption *
                                  processingData.usageTime *
                                  0.495
                                : processingData.gasConsumption *
                                  processingData.usageTime *
                                  0.23) || 0
                        ).toFixed(2)}{' '}
                        kg CO₂
                    </p>
                </div>
                <div>
                    <h4>Extraction Stage:</h4>
                    <p>
                        {(
                            (extractionData.grinderType === 'electric'
                                ? extractionData.powerConsumption *
                                  extractionData.usageTime *
                                  0.495
                                : 0) +
                            (extractionData.extractorPower === 'yes'
                                ? extractionData.extractorPowerConsumption *
                                  extractionData.usageTime *
                                  0.495
                                : 0)
                        ).toFixed(2)}{' '}
                        kg CO₂
                    </p>
                </div>
                <div>
                    <h4>Disposal Stage:</h4>
                    <p>
                        {(
                            disposalData.wasteMass * 0.455 +
                            (disposalData.packagingType === 'LDPE' ? 0.049 : 0)
                        ).toFixed(2)}{' '}
                        kg CO₂
                    </p>
                </div>
            </div>
        </div>
    );
}
