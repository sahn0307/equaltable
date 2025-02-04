'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const EmissionsContext = createContext();

export const useEmissionsContext = () => useContext(EmissionsContext);

export const EmissionsProvider = ({ children }) => {
  /**************************************************************
   * STATE: TRACK WHETHER SIMPLE ANALYSIS IS ACTIVE
   **************************************************************/
  const [isSimpleAnalysis, setIsSimpleAnalysis] = useState(false);

  /**************************************************************
   * 1) PRODUCTION STAGE
   **************************************************************/
  const [productionData, setProductionData] = useState({
    monthlyCoffeeUsage: '',
    carbonEmissionsPerKg: 1.56,
  });

  /**************************************************************
   * 2) TRANSPORT STAGE
   **************************************************************/
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

  const getTransportEmissionFactor = (segment, mode) => {
    if (segment === 'farmToPort') {
      if (mode === 'truck') return 0.1942;
      if (mode === 'train') return 0.0132;
    } else if (segment === 'portToDomestic') {
      if (mode === 'flight') return 0.7971;
      if (mode === 'ship') return 0.00902;
    } else if (segment === 'domestic') {
      if (mode === 'truck') return 0.1942;
      if (mode === 'train') return 0.03507;
    }
    return 0;
  };

  /**************************************************************
   * 3) PROCESSING STAGE
   **************************************************************/
  const [processingData, setProcessingData] = useState({
    roasterType: 'electric',
    roasterPower: '',
  });

  /**************************************************************
   * 4) EXTRACTION STAGE
   **************************************************************/
  const [extractionData, setExtractionData] = useState({
    grinderType: 'electric',
    powerConsumption: '',
  });

  /**************************************************************
   * 5) DISPOSAL STAGE
   **************************************************************/
  const [disposalData, setDisposalData] = useState({
    upcyclingStatus: '',
    disposalFactor: 0.34,
  });

  /**************************************************************
   * Calculate Emissions Per Kg
   **************************************************************/
  const calculateAllPerKg = useCallback(() => {
    if (isSimpleAnalysis) {
      return {
        productionPerKg: 1.17,
        transportPerKg: 11.11,
        processingPerKg: 0.18,
        extractionPerKg: 2.44,
        disposalPerKg: 0.43,
        totalPerKg: 1.17 + 11.11 + 0.18 + 2.44 + 0.43, // Ensuring correct total
      };
    }

    // ------------ 1) PRODUCTION ------------
    const productionPerKg = productionData.carbonEmissionsPerKg || 0;

    // ------------ 2) TRANSPORT ------------
    const { farmToPortDistance = 0, portToDomesticDistance = 0, domesticDistance = 0 } = transportData;
    const { farmToPort, portToDomestic, domestic } = transportData.transportType;

    const farmFactor = getTransportEmissionFactor('farmToPort', farmToPort);
    const portFactor = getTransportEmissionFactor('portToDomestic', portToDomestic);
    const domFactor = getTransportEmissionFactor('domestic', domestic);

    const transportPerKg =
      (parseFloat(farmToPortDistance) || 0) * farmFactor +
      (parseFloat(portToDomesticDistance) || 0) * portFactor +
      (parseFloat(domesticDistance) || 0) * domFactor;

    // ------------ 3) PROCESSING ------------
    const processingPerKg = processingData.roasterPower ? parseFloat(processingData.roasterPower) : 0.18;

    // ------------ 4) EXTRACTION ------------
    const extractionPerKg = extractionData.powerConsumption ? parseFloat(extractionData.powerConsumption) : 2.44;

    // ------------ 5) DISPOSAL ------------
    const disposalPerKg = disposalData.disposalFactor ? parseFloat(disposalData.disposalFactor) : 0.43;

    // ------------ TOTAL ------------
    const totalPerKg =
      productionPerKg +
      transportPerKg +
      processingPerKg +
      extractionPerKg +
      disposalPerKg;

    return {
      productionPerKg,
      transportPerKg,
      processingPerKg,
      extractionPerKg,
      disposalPerKg,
      totalPerKg,
    };
  }, [isSimpleAnalysis, productionData, transportData, processingData, extractionData, disposalData]);

  /**************************************************************
   * Function to Set Simple Analysis Defaults (Preserves User Input)
   **************************************************************/
  const setSimpleAnalysisDefaults = useCallback(() => {
    setIsSimpleAnalysis(true);

    // Preserve user's monthly coffee usage
    setProductionData((prev) => ({
      ...prev,
      carbonEmissionsPerKg: 1.17, // Only update emissions, not input value
    }));

    setTransportData((prev) => ({
      ...prev,
      farmToPortDistance: 11.11,
      portToDomesticDistance: 0,
      domesticDistance: 0,
    }));

    setProcessingData((prev) => ({
      ...prev,
      roasterPower: 0.18,
    }));

    setExtractionData((prev) => ({
      ...prev,
      powerConsumption: 2.44,
    }));

    setDisposalData((prev) => ({
      ...prev,
      disposalFactor: 0.43,
    }));
  }, []);

  /**************************************************************
   * Function to Save and Restore Form State
   **************************************************************/
  const saveFormState = useCallback(() => {
    const formState = {
      productionData,
      transportData,
      processingData,
      extractionData,
      disposalData,
      isSimpleAnalysis,
    };
    sessionStorage.setItem('formState', JSON.stringify(formState));
  }, [productionData, transportData, processingData, extractionData, disposalData, isSimpleAnalysis]);

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
      sessionStorage.removeItem('formState'); // Clear saved state after restoring
    } else {
      console.log('No saved form state found.');
    }
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
        saveFormState,
        restoreFormState,
      }}
    >
      {children}
    </EmissionsContext.Provider>
  );
};
