'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const EmissionsContext = createContext();

export const useEmissionsContext = () => useContext(EmissionsContext);

export const EmissionsProvider = ({ children }) => {
  /**************************************************************
   * 1) PRODUCTION STAGE
   **************************************************************/
  const [productionData, setProductionData] = useState({
    monthlyCoffeeUsage: '',
    carbonEmissionsPerKg: 1.56
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
      domestic: 'truck'
    }
  });

  /**************************************************************
   * 3) PROCESSING STAGE
   **************************************************************/
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
    afterburnerUsageTime: ''
  });

  /**************************************************************
   * 4) EXTRACTION STAGE (UPDATED)
   **************************************************************/
  const [extractionData, setExtractionData] = useState({
    grinderType: 'electric',
    powerConsumption: '',
    usageTime: '',
    productionQuantity: '',
    extractorPower: 'no',
    extractorPowerConsumption: '',
    extractorUsageTime: '',
    extractorProductionQuantity: ''
  });

  /**************************************************************
   * 5) DISPOSAL STAGE
   **************************************************************/
  const [disposalData, setDisposalData] = useState({
    upcyclingStatus: '' // 'yes' or 'no'
  });

  /**************************************************************
   *  HELPER for Transport: get the correct factor per segment & mode
   **************************************************************/
  const getTransportEmissionFactor = (segment, mode) => {
    if (segment === 'farmToPort') {
      if (mode === 'truck') return 0.13;
      if (mode === 'train') return 0.0132;
    } else if (segment === 'portToDomestic') {
      if (mode === 'flight') return 0.7971;
      if (mode === 'ship') return 0.0255;
    } else if (segment === 'domestic') {
      if (mode === 'truck') return 0.1942;
      if (mode === 'train') return 0.03507;
    }
    return 0;
  };

  /**************************************************************
   *            MASTER CALCULATION (PER KG) ACROSS ALL STAGES
   **************************************************************/
  const calculateAllPerKg = useCallback(() => {
    // ---------------- PRODUCTION (per kg) ----------------
    const productionPerKg = productionData.carbonEmissionsPerKg || 0;

    // ---------------- TRANSPORT (per kg) -----------------
    const {
      farmToPortDistance = 0,
      portToDomesticDistance = 0,
      domesticDistance = 0,
      transportType = {}
    } = transportData;

    const { farmToPort, portToDomestic, domestic } = transportType || {};

    const A = parseFloat(farmToPortDistance) || 0;
    const B = parseFloat(portToDomesticDistance) || 0;
    const C = parseFloat(domesticDistance) || 0;

    const farmFactor = getTransportEmissionFactor('farmToPort', farmToPort);
    const portFactor = getTransportEmissionFactor('portToDomestic', portToDomestic);
    const domFactor = getTransportEmissionFactor('domestic', domestic);

    const totalTransportSegments = A * farmFactor + B * portFactor + C * domFactor;
    const transportPerKg = (totalTransportSegments * 1.34) / 1000;

    // ---------------- PROCESSING (per kg) ----------------
    const {
      roasterType,
      roasterPower = 0,
      gasConsumption = 0,
      usageTime = 0,
      productionQuantity = 1,
      smokeEliminatorPowerConsumption = 0
    } = processingData;

    let processingPerKg = 0;
    // Same logic from your updated ProcessingStage
    if (roasterType === 'electric') {
      // Electric: ((roasterPower + smokeElim) * usageTime * 0.4951)/productionQuantity
      processingPerKg =
        (((parseFloat(roasterPower) || 0) +
          (parseFloat(smokeEliminatorPowerConsumption) || 0)) *
          (parseFloat(usageTime) || 0) *
          0.4951) /
        (parseFloat(productionQuantity) || 1);
    } else if (roasterType === 'gas') {
      // Gas: electricPart + gasPart
      const electricPart =
        (((parseFloat(roasterPower) || 0) +
          (parseFloat(smokeEliminatorPowerConsumption) || 0)) *
          (parseFloat(usageTime) || 0) *
          0.4951) /
        (parseFloat(productionQuantity) || 1);

      const gasPart = (parseFloat(gasConsumption) || 0) * 0.00157794;
      processingPerKg = electricPart + gasPart;
    }

    // ---------------- EXTRACTION (per kg) ---------------
    const {
      grinderType,
      powerConsumption,
      usageTime: extUsageTime,
      productionQuantity: extQty,
      extractorPower,
      extractorPowerConsumption,
      extractorUsageTime,
      extractorProductionQuantity
    } = extractionData;

    let extractionPerKg = 0;
    // The updated formula from your new ExtractionStage:
    // EF = 0.4951
    const EF = 0.4951;

    // Short references:
    const gA = parseFloat(powerConsumption) || 0;         // Grinder power
    const gB = parseFloat(extUsageTime) || 0;             // Grinder usage time
    const gC = parseFloat(extQty) || 0;                   // Grinder production
    const eD = parseFloat(extractorPowerConsumption) || 0;// Extractor power
    const eE = parseFloat(extractorUsageTime) || 0;       // Extractor usage time
    const eF = parseFloat(extractorProductionQuantity) || 0; // Extractor production

    if (grinderType === 'electric') {
      if (extractorPower === 'yes') {
        // Electric + Extractor
        // = (gA * EF * gB)/gC + (eD * EF * eE)/eF if gC>0 & eF>0
        if (gC > 0 && eF > 0) {
          extractionPerKg = (gA * EF * gB) / gC + (eD * EF * eE) / eF;
        } else if (gC > 0) {
          // partial if eF=0 => only do the first half
          extractionPerKg = (gA * EF * gB) / gC;
        }
      } else {
        // Electric + No extractor
        if (gC > 0) {
          extractionPerKg = (gA * EF * gB) / gC;
        }
      }
    } else if (grinderType === 'manual') {
      // Manual
      if (extractorPower === 'yes') {
        // If eF>0 => (eD * EF * eE)/eF
        if (eF > 0) {
          extractionPerKg = (eD * EF * eE) / eF;
        }
      } else {
        extractionPerKg = 0;
      }
    }

    // ---------------- DISPOSAL (per kg) -----------------
    let disposalPerKg = 0;
    if (disposalData.upcyclingStatus === 'no') {
      disposalPerKg = 0.34;
    }

    // ---------------- SUM TOTAL (per kg) ----------------
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
      totalPerKg
    };
  }, [
    productionData,
    transportData,
    processingData,
    extractionData,
    disposalData
  ]);

  /**************************************************************
   *               SAVE & RESTORE STATE
   **************************************************************/
  const saveFormState = useCallback(() => {
    const formState = {
      productionData,
      transportData,
      processingData,
      extractionData,
      disposalData
    };
    sessionStorage.setItem('formState', JSON.stringify(formState));
  }, [
    productionData,
    transportData,
    processingData,
    extractionData,
    disposalData
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

  /**************************************************************
   *                CONTEXT PROVIDER RETURN
   **************************************************************/
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
        restoreFormState
      }}
    >
      {children}
    </EmissionsContext.Provider>
  );
};
