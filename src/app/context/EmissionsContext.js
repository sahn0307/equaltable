'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const EmissionsContext = createContext();

export const useEmissionsContext = () => useContext(EmissionsContext);

export const EmissionsProvider = ({ children }) => {
  const [isSimpleAnalysis, setIsSimpleAnalysis] = useState(false);

  const [productionData, setProductionData] = useState({
    monthlyCoffeeUsage: '',
    carbonEmissionsPerKg: 1.56,
  });

  const [transportData, setTransportData] = useState({
    farmToPortDistance: '',
    portToDomesticDistance: '',
    domesticDistance: '',
    transportType: {
      farmToPort: 'truck',
      portToDomestic: 'flight',
      domestic: 'truck',
    },
  });

  const [processingData, setProcessingData] = useState({
    roasterType: 'electric',
    roasterPower: '',
  });

  const [extractionData, setExtractionData] = useState({
    grinderType: 'electric',
    powerConsumption: '',
  });

  const [disposalData, setDisposalData] = useState({
    upcyclingStatus: '',
    disposalFactor: 0.34,
  });

  const getTransportEmissionFactor = (segment, mode) => {
    if (segment === 'farmToPort') {
      return mode === 'truck' ? 0.1942 : mode === 'train' ? 0.0132 : 0;
    } else if (segment === 'portToDomestic') {
      return mode === 'flight' ? 0.7971 : mode === 'ship' ? 0.00902 : 0;
    } else if (segment === 'domestic') {
      return mode === 'truck' ? 0.1942 : mode === 'train' ? 0.03507 : 0;
    }
    return 0;
  };

  const calculateAllPerKg = useCallback(() => {
    if (isSimpleAnalysis) {
      return {
        productionPerKg: 1.17,
        transportPerKg: 11.11,
        processingPerKg: 0.18,
        extractionPerKg: 2.44,
        disposalPerKg: 0.43,
        totalPerKg: 1.17 + 11.11 + 0.18 + 2.44 + 0.43,
      };
    }
  
    // Detailed Analysis: Disposal Emissions
    const {
      upcyclingStatus = '',
      disposalFactor = 0.34 // Default value if empty
    } = disposalData;
  
    let disposalPerKg = 0;
  
    if (upcyclingStatus === 'no') {
      disposalPerKg = disposalFactor !== '' ? disposalFactor : 0.34;
    }
  
    // Other Stage Calculations
    const productionPerKg = productionData.carbonEmissionsPerKg || 0;
  
    const {
      farmToPortDistance = 0,
      portToDomesticDistance = 0,
      domesticDistance = 0,
      transportType = {},
    } = transportData;
  
    const { farmToPort, portToDomestic, domestic } = transportType;
  
    const A_transport =
      farmToPortDistance * getTransportEmissionFactor('farmToPort', farmToPort);
    const B_transport =
      portToDomesticDistance *
      getTransportEmissionFactor('portToDomestic', portToDomestic);
    const C_transport =
      domesticDistance * getTransportEmissionFactor('domestic', domestic);
  
    const transportPerKg = ((A_transport + B_transport + C_transport) * 1.34) / 1000;
  
    const processingPerKg = parseFloat(processingData.roasterPower || 0);
  
    const {
      grinderType = '',
      powerConsumption = 0,
      usageTime = 0,
      productionQuantity = 0,
      extractorPower = 'no',
      extractorPowerConsumption = 0,
      extractorUsageTime = 0,
      extractorProductionQuantity = 0
    } = extractionData;
  
    const A = powerConsumption;
    const B = usageTime;
    const C = productionQuantity;
    const D = extractorPowerConsumption;
    const E = extractorUsageTime;
    const F = extractorProductionQuantity;
    const EF = 0.4951;
  
    let extractionPerKg = 0;
  
    if (grinderType === 'electric') {
      if (extractorPower === 'yes') {
        if (C > 0 && F > 0) {
          extractionPerKg = (A * EF * B) / C + (D * EF * E) / F;
        } else if (C > 0) {
          extractionPerKg = (A * EF * B) / C;
        }
      } else {
        if (C > 0) {
          extractionPerKg = (A * EF * B) / C;
        }
      }
    } else if (grinderType === 'manual') {
      if (extractorPower === 'yes' && F > 0) {
        extractionPerKg = (D * EF * E) / F;
      }
    }
  
    const totalPerKg =
      productionPerKg +
      transportPerKg +
      processingPerKg +
      extractionPerKg +
      disposalPerKg;
  
    console.log('Calculated Emissions:', {
      productionPerKg,
      transportPerKg,
      processingPerKg,
      extractionPerKg,
      disposalPerKg,
      totalPerKg,
    });
  
    return {
      productionPerKg,
      transportPerKg,
      processingPerKg,
      extractionPerKg,
      disposalPerKg,
      totalPerKg,
    };
  }, [isSimpleAnalysis, productionData, transportData, processingData, extractionData, disposalData]);
  
  const setSimpleAnalysisDefaults = useCallback(() => {
    setIsSimpleAnalysis(true); // Enable Simple Analysis mode
  }, []);

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
        isSimpleAnalysis,
        setSimpleAnalysisDefaults,
        calculateAllPerKg,
      }}
    >
      {children}
    </EmissionsContext.Provider>
  );
};
