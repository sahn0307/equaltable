'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const EmissionsContext = createContext();

export const useEmissionsContext = () => useContext(EmissionsContext);

export const EmissionsProvider = ({ children }) => {
  // 1) PRODUCTION STAGE
  const [productionData, setProductionData] = useState({
    monthlyCoffeeUsage: '',
    carbonEmissionsPerKg: 1.56,
  });

  // 2) TRANSPORT STAGE
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

  // 3) PROCESSING STAGE
  const [processingData, setProcessingData] = useState({
    roasterType: 'electric',
    roasterPower: '',
    gasConsumption: '',
    usageTime: '',
    productionQuantity: '',
    smokeEliminator: 'notInUse',
    smokeEliminatorPowerConsumption: '',
    afterburnerPowerConsumption: '',
    afterburnerGasConsumption: '',
    afterburnerUsageTime: '',
  });

  // 4) EXTRACTION STAGE
  const [extractionData, setExtractionData] = useState({
    grinderType: 'electric',
    powerConsumption: '',
    usageTime: '',
    productionQuantity: '',
    extractorPower: 'yes',
    extractorPowerConsumption: '',
    extractorUsageTime: '',
    extractorProductionQuantity: '',
  });

  // 5) DISPOSAL STAGE
  const [disposalData, setDisposalData] = useState({
    upcyclingStatus: '', // 'yes' or 'no'
  });

  /**************************************************************
   *                 SHARED CALCULATION FUNCTION
   **************************************************************/
  const calculateAllPerKg = useCallback(() => {
    // PRODUCTION (per kg)
    const productionPerKg = productionData.carbonEmissionsPerKg || 0;

    // TRANSPORT (per kg) - example logic
    const farmFactor =
      transportData.transportType?.farmToPort === 'truck' ? 0.062 : 0.602;
    const portFactor =
      transportData.transportType?.portToDomestic === 'truck' ? 0.062 : 0.602;
    const domesticFactor =
      transportData.transportType?.domestic === 'truck' ? 0.062 : 0.602;

    const transportPerKg =
      (transportData.farmToPortDistance || 0) * farmFactor +
      (transportData.portToDomesticDistance || 0) * portFactor +
      (transportData.domesticDistance || 0) * domesticFactor;

    // PROCESSING (per kg) - adapt your logic as needed
    const {
      roasterType,
      roasterPower = 0,
      gasConsumption = 0,
      usageTime = 0,
      productionQuantity = 1,
      smokeEliminator,
    } = processingData;

    let roasterEmissions = 0;

    if (roasterType === 'electric') {
      roasterEmissions = (roasterPower * usageTime) / productionQuantity;
    } else {
      roasterEmissions = (gasConsumption * usageTime) / productionQuantity;
    }

    // Smoke eliminator logic
    let smokeEliminatorExtra = 0;
    if (smokeEliminator !== 'notInUse') {
      smokeEliminatorExtra = 0.1; // Placeholder for extra emissions
    }

    const processingPerKg = roasterEmissions + smokeEliminatorExtra;

    // EXTRACTION (per kg)
    const {
      grinderType,
      powerConsumption,
      usageTime: extUsageTime,
      productionQuantity: extQuantity = 1,
      extractorPower,
      extractorPowerConsumption,
      extractorUsageTime,
    } = extractionData;

    let extractionPerKg = 0;

    if (grinderType === 'electric') {
      const base = (powerConsumption * extUsageTime) / extQuantity;
      const extra =
        extractorPower === 'yes' ? (extractorPowerConsumption || 0) : 0;
      extractionPerKg = base + extra;
    }

    // DISPOSAL (per kg)
    let disposalPerKg = 0;
    if (disposalData.upcyclingStatus === 'no') {
      disposalPerKg += 0.34; // Example: coffeeWasteEmissions = 0.34
    }

    // Sum them
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
  }, [
    productionData,
    transportData,
    processingData,
    extractionData,
    disposalData,
  ]);

  /**************************************************************
   *                   FORM STATE PERSISTENCE
   **************************************************************/
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
        calculateAllPerKg,
        saveFormState,
        restoreFormState,
      }}
    >
      {children}
    </EmissionsContext.Provider>
  );
};
