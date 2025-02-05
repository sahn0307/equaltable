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
  
    // Detailed Analysis: Processing Emissions
    const {
      roasterType = '',
      roasterPower = 0,
      gasConsumption = 0,
      usageTime = 0,
      productionQuantity = 1,
      smokeEliminator,
      smokeEliminatorPowerConsumption = 0,
    } = processingData;
  
    let processingPerKg = 0;
  
    if (roasterType === 'electric') {
      if (productionQuantity > 0) {
        processingPerKg =
          ((roasterPower || 0) + (smokeEliminatorPowerConsumption || 0)) *
          (usageTime || 0) *
          0.4951 /
          productionQuantity;
      }
    } else if (roasterType === 'gas') {
      let electricPart = 0;
      let gasPart = 0;
  
      if (productionQuantity > 0) {
        electricPart =
          ((roasterPower || 0) + (smokeEliminatorPowerConsumption || 0)) *
          (usageTime || 0) *
          0.4951 /
          productionQuantity;
      }
      gasPart = (gasConsumption || 0) * 0.00157794;
  
      processingPerKg = electricPart + gasPart;
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
  
    const extractionPerKg = parseFloat(extractionData.powerConsumption || 0);
    const disposalPerKg = parseFloat(disposalData.disposalFactor || 0);
  
    const totalPerKg =
      productionPerKg +
      transportPerKg +
      processingPerKg +
      extractionPerKg +
      disposalPerKg;
  
    console.log('✅ Corrected Processing Emissions:', {
      roasterType,
      roasterPower,
      usageTime,
      productionQuantity,
      gasConsumption,
      smokeEliminator,
      smokeEliminatorPowerConsumption,
      processingPerKg
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
