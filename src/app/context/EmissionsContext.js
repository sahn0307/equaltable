'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const EmissionsContext = createContext();

export const useEmissionsContext = () => useContext(EmissionsContext);

export const EmissionsProvider = ({ children }) => {
  const [isSimpleAnalysis, setIsSimpleAnalysis] = useState(false);
  const setDetailedAnalysisMode = useCallback(() => {
    setIsSimpleAnalysis(false); // Disable Simple Analysis mode
  }, []);
  
  

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
  
    // 1️⃣ Production Stage
    const productionPerKg = productionData.carbonEmissionsPerKg || 0;
  
    // 2️⃣ Transportation Stage
    const {
      farmToPortDistance = 0,
      portToDomesticDistance = 0,
      domesticDistance = 0,
      transportType = {},
    } = transportData;
  
    const { farmToPort, portToDomestic, domestic } = transportType;
  
    const farmTransport =
      farmToPortDistance * getTransportEmissionFactor('farmToPort', farmToPort);
    const portTransport =
      portToDomesticDistance *
      getTransportEmissionFactor('portToDomestic', portToDomestic);
    const domesticTransport =
      domesticDistance * getTransportEmissionFactor('domestic', domestic);
  
    const transportPerKg = ((farmTransport + portTransport + domesticTransport) * 1.34) / 1000;
  
    // 3️⃣ Processing Stage (Using Unique Variable Names)
    const {
      roasterType: processingRoasterType = '',
      roasterPower: processingPower = 0,
      gasConsumption: processingGasConsumption = 0,
      usageTime: processingUsageTime = 0,
      productionQuantity: processingProductionQty = 1,
      smokeEliminator,
      smokeEliminatorPowerConsumption: processingSmokePower = 0,
    } = processingData;
  
    let processingPerKg = 0;
  
    if (processingRoasterType === 'electric') {
      if (processingProductionQty > 0) {
        processingPerKg =
          ((processingPower || 0) + (processingSmokePower || 0)) *
          (processingUsageTime || 0) *
          0.4951 /
          processingProductionQty;
      }
    } else if (processingRoasterType === 'gas') {
      let electricPart = 0;
      let gasPart = 0;
  
      if (processingProductionQty > 0) {
        electricPart =
          ((processingPower || 0) + (processingSmokePower || 0)) *
          (processingUsageTime || 0) *
          0.4951 /
          processingProductionQty;
      }
      gasPart = (processingGasConsumption || 0) * 0.00157794;
  
      processingPerKg = electricPart + gasPart;
    }
  
    // 4️⃣ Extraction Stage (Using Unique Variable Names)
    const {
      grinderType: extractionGrinderType = '',
      powerConsumption: extractionPower = 0,            
      usageTime: extractionUsageTime = 0,                   
      productionQuantity: extractionProductionQty = 0,          
      extractorPower,
      extractorPowerConsumption: extractionExtractorPower = 0,   
      extractorUsageTime: extractionExtractorUsage = 0,          
      extractorProductionQuantity: extractionExtractorQty = 0  
    } = extractionData;
  
    const EF = 0.4951; // Emission factor
    let extractionPerKg = 0;
  
    if (extractionGrinderType === 'electric') {
      if (extractorPower === 'yes') {
        if (extractionProductionQty > 0 && extractionExtractorQty > 0) {
          extractionPerKg = (extractionPower * EF * extractionUsageTime) / extractionProductionQty + (extractionExtractorPower * EF * extractionExtractorUsage) / extractionExtractorQty;
        } else if (extractionProductionQty > 0) {
          extractionPerKg = (extractionPower * EF * extractionUsageTime) / extractionProductionQty;
        }
      } else {
        if (extractionProductionQty > 0) {
          extractionPerKg = (extractionPower * EF * extractionUsageTime) / extractionProductionQty;
        }
      }
    } else if (extractionGrinderType === 'manual') {
      if (extractorPower === 'yes' && extractionExtractorQty > 0) {
        extractionPerKg = (extractionExtractorPower * EF * extractionExtractorUsage) / extractionExtractorQty;
      }
    }
  
    // 5️⃣ Disposal Stage
    const {
      upcyclingStatus = '',
      disposalFactor = 0.34 
    } = disposalData;
  
    let disposalPerKg = 0;
  
    if (upcyclingStatus === 'no') {
      disposalPerKg = disposalFactor !== '' ? disposalFactor : 0.34;
    }
  
    // 🔹 Final Total Calculation 🔹
    const totalPerKg =
      productionPerKg +
      transportPerKg +
      processingPerKg +
      extractionPerKg +
      disposalPerKg;
  
    console.log('✅ Final Emissions Breakdown:', {
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

  const restoreFormState = useCallback(() => {
    console.log('Restoring form state...');
    const saved = sessionStorage.getItem('formState');
    if (saved) {
      const state = JSON.parse(saved);
      console.log('Restored state:', state);
      setProductionData(state.productionData || {});
      setTransportData(state.transportData || {});
      setProcessingData(state.processingData || {});
      setExtractionData(state.extractionData || {});
      setDisposalData(state.disposalData || {});
      setIsSimpleAnalysis(state.isSimpleAnalysis || false);
      sessionStorage.removeItem('formState'); // Clear after restoring
    } else {
      console.log('No saved form state found.');
    }
  }, []);
  const saveFormState = useCallback(() => {
    const formState = {
      productionData,
      transportData,
      processingData,
      extractionData,
      disposalData,
      isSimpleAnalysis,
    };
  
    console.log('✅ Saving Form State:', formState);
    sessionStorage.setItem('formState', JSON.stringify(formState));
  }, [productionData, transportData, processingData, extractionData, disposalData, isSimpleAnalysis]);
  
  

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
        setDetailedAnalysisMode,
        calculateAllPerKg,
        restoreFormState,
        saveFormState,
      }}
    >
      {children}
    </EmissionsContext.Provider>
  );
};
