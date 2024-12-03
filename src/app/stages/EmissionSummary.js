'use client';

export default function EmissionSummary({
    productionData,
    transportData,
    processingData,
    extractionData,
    disposalData,
}) {
    // **Production Stage Emissions**
    const productionEmissions =
        parseFloat(productionData?.emissions) || -2.69; // Absorption during farming (per kg)

    // **Transportation Stage Emissions**
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

    const calculateTransportEmissions = () => {
        const farmToPort =
            (parseFloat(transportData?.farmToPortDistance) || 0) *
            getTransportEmissionFactor(transportData?.transportType?.farmToPort);
        const portToDomestic =
            (parseFloat(transportData?.portToDomesticDistance) || 0) *
            getTransportEmissionFactor(
                transportData?.transportType?.portToDomestic
            );
        const domestic =
            (parseFloat(transportData?.domesticDistance) || 0) *
            getTransportEmissionFactor(transportData?.transportType?.domestic);

        return (farmToPort + portToDomestic + domestic) * 0.001; // Convert t to kg
    };

    const transportEmissions = calculateTransportEmissions();

    // **Processing Stage Emissions**
    const calculateProcessingEmissions = () => {
        const roastingEmissions =
            ((parseFloat(processingData?.roasterPower) || 0) *
                (parseFloat(processingData?.usageTime) || 0) *
                0.495) / // kg CO₂ per kWh
            parseFloat(processingData?.productionQuantity || 1); // Normalize per kg
        const packagingEmissions =
            (parseFloat(processingData?.packagingWeight) || 0.0263) *
            0.05; // Average kg CO₂ per packaging kg

        return roastingEmissions + packagingEmissions;
    };

    const processingEmissions = calculateProcessingEmissions();

    // **Extraction Stage Emissions**
    const calculateExtractionEmissions = () => {
        const grinderEmissions =
            extractionData?.grinderType === 'electric'
                ? (parseFloat(extractionData?.powerConsumption) || 0) *
                  (parseFloat(extractionData?.usageTime) || 0) *
                  0.495
                : 0;
        const extractorEmissions =
            extractionData?.extractorPower === 'yes'
                ? (parseFloat(extractionData?.extractorPowerConsumption) || 0) *
                  (parseFloat(extractionData?.usageTime) || 0) *
                  0.495
                : 0;

        return grinderEmissions + extractorEmissions;
    };

    const extractionEmissions = calculateExtractionEmissions();

    // **Disposal Stage Emissions**
    const getDisposalEmissionFactor = (method) => {
        switch (method) {
            case 'landfill':
                return 0.4551; // kg CO₂ per kg of waste
            case 'incineration':
                return 1.182; // kg CO₂ per kg of waste
            case 'recycling':
                return 0.1; // kg CO₂ per kg of waste
            default:
                return 0;
        }
    };

    const calculateDisposalEmissions = () => {
        return (
            (parseFloat(disposalData?.wasteMass) || 0) *
            getDisposalEmissionFactor(disposalData?.disposalMethod)
        );
    };

    const disposalEmissions = calculateDisposalEmissions();

    // **Total Emissions**
    const totalEmissions =
        productionEmissions +
        transportEmissions +
        processingEmissions +
        extractionEmissions +
        disposalEmissions;

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

            <div>
                <strong>Total Emissions:</strong> {totalEmissions.toFixed(2)} kg CO₂
            </div>
        </div>
    );
}
