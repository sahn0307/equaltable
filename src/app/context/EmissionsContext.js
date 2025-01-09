'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const EmissionsContext = createContext();

export const useEmissionsContext = () => useContext(EmissionsContext);

export const EmissionsProvider = ({ children }) => {
  // 1) PRODUCTION STAGE
  const [productionData, setProductionData] = useState({
    monthlyCoffeeUsage: 0,
    carbonEmissionsPerKg: 1.56,
  });

  // 2) TRANSPORT STAGE
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

  // 3) PROCESSING STAGE
  const [processingData, setProcessingData] = useState({
    roasterType: 'electric',
    roasterPower: 0,
    gasConsumption: 0,
    usageTime: 0,
    productionQuantity: 0,
    smokeEliminator: 'notInUse',
    smokeEliminatorPowerConsumption: 0,
    afterburnerPowerConsumption: 0,
    afterburnerGasConsumption: 0,
    afterburnerUsageTime: 0,
  });

  // 4) EXTRACTION STAGE
  const [extractionData, setExtractionData] = useState({
    grinderType: 'electric',
    powerConsumption: 0,
    usageTime: 0,
    productionQuantity: 0,
    extractorPower: 'yes',
    extractorPowerConsumption: 0,
    extractorUsageTime: 0,
    extractorProductionQuantity: 0,
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
      roasterPower,
      gasConsumption,
      usageTime,
      productionQuantity,
      smokeEliminator,
      // afterburner fields if you incorporate them
    } = processingData;

    const qty = productionQuantity > 0 ? productionQuantity : 1;
    let roasterEmissions = 0;

    if (roasterType === 'electric') {
      roasterEmissions = (roasterPower * usageTime) / qty;
    } else {
      roasterEmissions = (gasConsumption * usageTime) / qty;
    }

    // If "notInUse", no extra, otherwise add something
    let smokeEliminatorExtra = 0;
    if (smokeEliminator !== 'notInUse') {
      // Example placeholder
      smokeEliminatorExtra = 0.1;
    }

    const processingPerKg = roasterEmissions + smokeEliminatorExtra;

    // EXTRACTION (per kg) - adapt your logic
    const {
      grinderType,
      powerConsumption,
      usageTime: extUsageTime,
      productionQuantity: extQuantity,
      extractorPower,
      extractorPowerConsumption,
      extractorUsageTime,
      extractorProductionQuantity,
    } = extractionData;

    let extractionPerKg = 0;

    if (grinderType === 'electric') {
      const base = (powerConsumption * extUsageTime) / (extQuantity || 1);
      // Add extra if extractorPower is 'yes'
      const extra = extractorPower === 'yes' ? extractorPowerConsumption || 0 : 0;
      // If you want to factor in extractorUsageTime, do so here
      extractionPerKg = base + extra;
    } else {
      // manual => 0 or your logic
      extractionPerKg = 0;
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
    disposalData
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
        calculateAllPerKg, // <-- Exposed function
        saveFormState,
        restoreFormState,
      }}
    >
      {children}
    </EmissionsContext.Provider>
  );
};
