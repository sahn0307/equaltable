import { createContext, useContext, useState } from 'react';

// Create the context
const EmissionsContext = createContext();

// Hook for consuming context
export const useEmissionsContext = () => useContext(EmissionsContext);

// Provider component
export const EmissionsProvider = ({ children }) => {
    const [productionData, setProductionData] = useState({
        monthlyCoffeeUsage: 0,
        carbonEmissionsPerKg: 0,
    });

    const [transportData, setTransportData] = useState({
        farmToPortDistance: 0,
        portToDomesticDistance: 0,
        domesticDistance: 0,
        transportType: {
            farmToPort: 'truck',
            portToDomestic: 'ship',
            domestic: 'truck',
        },
    });

    const [processingData, setProcessingData] = useState({
        roasterType: 'electric',
        powerConsumption: 0,
        gasConsumption: 0,
        usageTime: 0,
        productionQuantity: 0,
        smokeEliminator: 'none',
    });

    const [extractionData, setExtractionData] = useState({
        grinderType: 'electric',
        powerConsumption: 0,
        usageTime: 0,
        productionQuantity: 0,
        extractorPower: 'no',
        extractorPowerConsumption: 0,
    });

    const [disposalData, setDisposalData] = useState({
        wasteMass: 0,
        packagingType: 'LDPE',
        disposalMethod: 'landfill',
        isRecycled: 'no',
    });

    return (
        <EmissionsContext.Provider
            value={{
                productionData,
                setProductionData,
                transportData,
                setTransportData,
                processingData,
                setProcessingData,
                extractionData,
                setExtractionData,
                disposalData,
                setDisposalData,
            }}
        >
            {children}
        </EmissionsContext.Provider>
    );
};
