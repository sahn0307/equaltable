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
   * 4) EXTRACTION STAGE
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
   * 5) DISPOSAL STAGE (UPDATED)
   **************************************************************/
  const [disposalData, setDisposalData] = useState({
    upcyclingStatus: '',     // 'yes' or 'no'
    disposalFactor: 0.34     // default if user hasn't changed
  });

  /**************************************************************
   * HELPER for Transport: get the correct factor per segment & mode
   **************************************************************/
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
   *                  MASTER CALCULATION (PER KG)
   **************************************************************/
  const calculateAllPerKg = useCallback(() => {
    // ------------ 1) PRODUCTION ------------
    const productionPerKg = productionData.carbonEmissionsPerKg || 0;

    // ------------ 2) TRANSPORT -------------
    const {
      farmToPortDistance = 0,
      portToDomesticDistance = 0,
      domesticDistance = 0,
      transportType = {}
    } = transportData;

    const { farmToPort, portToDomestic, domestic } = transportType;

    const A = parseFloat(farmToPortDistance) || 0;
    const B = parseFloat(portToDomesticDistance) || 0;
    const C = parseFloat(domesticDistance) || 0;

    const farmFactor = getTransportEmissionFactor('farmToPort', farmToPort);
    const portFactor = getTransportEmissionFactor('portToDomestic', portToDomestic);
    const domFactor = getTransportEmissionFactor('domestic', domestic);

    const totalTransportSegments = A * farmFactor + B * portFactor + C * domFactor;
    const transportPerKg = (totalTransportSegments * 1.34) / 1000;

    // ------------ 3) PROCESSING -------------
    const {
      roasterType,
      roasterPower = 0,
      gasConsumption = 0,
      usageTime = 0,
      productionQuantity = 1,
      smokeEliminatorPowerConsumption = 0
    } = processingData;

    let processingPerKg = 0;
    if (roasterType === 'electric') {
      // Electric formula
      processingPerKg =
        (((parseFloat(roasterPower) || 0) +
          (parseFloat(smokeEliminatorPowerConsumption) || 0)) *
          (parseFloat(usageTime) || 0) *
          0.4951) /
        (parseFloat(productionQuantity) || 1);
    } else if (roasterType === 'gas') {
      // Gas formula
      const electricPart =
        (((parseFloat(roasterPower) || 0) +
          (parseFloat(smokeEliminatorPowerConsumption) || 0)) *
          (parseFloat(usageTime) || 0) *
          0.4951) /
        (parseFloat(productionQuantity) || 1);

      const gasPart = (parseFloat(gasConsumption) || 0) * 0.00157794;
      processingPerKg = electricPart + gasPart;
    }

    // ------------ 4) EXTRACTION -------------
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
    const EF = 0.4951; // Emission factor for electricity
    // short local references
    const gA = parseFloat(powerConsumption) || 0;
    const gB = parseFloat(extUsageTime) || 0;
    const gC = parseFloat(extQty) || 0;
    const eD = parseFloat(extractorPowerConsumption) || 0;
    const eE = parseFloat(extractorUsageTime) || 0;
    const eF = parseFloat(extractorProductionQuantity) || 0;

    if (grinderType === 'electric') {
      if (extractorPower === 'yes') {
        if (gC > 0 && eF > 0) {
          extractionPerKg = (gA * EF * gB) / gC + (eD * EF * eE) / eF;
        } else if (gC > 0) {
          extractionPerKg = (gA * EF * gB) / gC;
        }
      } else {
        // no extractor
        if (gC > 0) {
          extractionPerKg = (gA * EF * gB) / gC;
        }
      }
    } else if (grinderType === 'manual') {
      if (extractorPower === 'yes') {
        if (eF > 0) {
          extractionPerKg = (eD * EF * eE) / eF;
        }
      } else {
        extractionPerKg = 0;
      }
    }

    // ------------ 5) DISPOSAL (UPDATED) -----------
    let disposalPerKg = 0;
    const { upcyclingStatus, disposalFactor } = disposalData;

    // if upcyclingStatus === 'no', use disposalFactor (could be negative, zero, or positive)
    // else 0
    if (upcyclingStatus === 'no') {
      disposalPerKg = parseFloat(disposalFactor) || 0;
    }

    // ------------ TOTAL -------------
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
   *            SAVE / RESTORE STATE (OPTIONAL)
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
   *                  PROVIDER RETURN
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
