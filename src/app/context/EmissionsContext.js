'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const EmissionsContext = createContext();

export const useEmissionsContext = () => useContext(EmissionsContext);

export const EmissionsProvider = ({ children }) => {
  /****************************************************
   * 1) PRODUCTION STAGE
   ****************************************************/
  const [productionData, setProductionData] = useState({
    monthlyCoffeeUsage: 0,
    // Updated default to 1.56 (instead of 1.64)
    carbonEmissionsPerKg: 1.56,
  });

  /****************************************************
   * 2) TRANSPORT STAGE
   * (No changes mentioned, so we keep as-is)
   ****************************************************/
  const [transportData, setTransportData] = useState({
    farmToPortDistance: 0,
    portToDomesticDistance: 0,
    domesticDistance: 0,
    transportType: {
      farmToPort: 'truck',
      portToDomestic: 'flight',
      domestic: 'truck',
    },
  });

  /****************************************************
   * 3) PROCESSING STAGE
   * Updated fields to match new roaster logic
   ****************************************************/
  const [processingData, setProcessingData] = useState({
    roasterType: 'electric',           // 'electric' or 'gas'
    roasterPower: 0,                   // Replaces powerConsumption for electric
    gasConsumption: 0,                 // m³/hr if roasterType === 'gas'
    usageTime: 0,
    productionQuantity: 0,
    smokeEliminator: 'notInUse',       // 'smokeEliminator', 'afterburner', or 'notInUse'
    smokeEliminatorPowerConsumption: 0,
    afterburnerPowerConsumption: 0,
    afterburnerGasConsumption: 0,
    afterburnerUsageTime: 0,
  });

  /****************************************************
   * 4) EXTRACTION STAGE
   * Includes new fields: extractorUsageTime, extractorProductionQuantity
   ****************************************************/
  const [extractionData, setExtractionData] = useState({
    grinderType: 'electric',           // 'electric' or 'manual'
    powerConsumption: 0,               // for electric grinder
    usageTime: 0,                      // for electric grinder
    productionQuantity: 0,             // for electric grinder
    extractorPower: 'yes',             // 'yes' or 'no'
    extractorPowerConsumption: 0,
    extractorUsageTime: 0,
    extractorProductionQuantity: 0,
  });

  /****************************************************
   * 5) DISPOSAL STAGE
   * Removed all fields except upcyclingStatus
   ****************************************************/
  const [disposalData, setDisposalData] = useState({
    upcyclingStatus: 'yes',  // 'yes' or 'no'
  });

  /****************************************************
   * Methods for form state persistence
   ****************************************************/
  const saveFormState = useCallback(() => {
    const formState = {
      productionData,
      transportData,
      processingData,
      extractionData,
      disposalData,
    };
    sessionStorage.setItem('formState', JSON.stringify(formState));
  }, [
    productionData,
    transportData,
    processingData,
    extractionData,
    disposalData,
  ]);

  const restoreFormState = useCallback(() => {
    const saved = sessionStorage.getItem('formState');
    if (saved) {
      const state = JSON.parse(saved);
      setProductionData(state.productionData);
      setTransportData(state.transportData);
      setProcessingData(state.processingData);
      setExtractionData(state.extractionData);
      setDisposalData(state.disposalData);
      sessionStorage.removeItem('formState');
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
        saveFormState,
        restoreFormState,
      }}
    >
      {children}
    </EmissionsContext.Provider>
  );
};
