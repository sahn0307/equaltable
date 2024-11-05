// src/app/stages/ExtractionStage.js
"use client";

import { useEffect, useState } from 'react';

export default function ExtractionStage({ extractionData, setExtractionData }) {
  // Local state for monthly emissions at this stage
  const [monthlyEmissions, setMonthlyEmissions] = useState(0);

  // Handle input changes for extraction stage
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExtractionData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  // Handle radio button changes for grinder and extractor power types
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setExtractionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Calculate monthly emissions whenever extractionData changes
  useEffect(() => {
    const { grinderType, powerConsumption, usageTime, extractorPower, extractorPowerConsumption } = extractionData;

    let emissions = 0;
    const electricityEmissionFactor = 0.495; // kg CO₂ per kWh

    if (grinderType === 'electric' && powerConsumption > 0 && usageTime > 0) {
      emissions += powerConsumption * usageTime * electricityEmissionFactor;
    }
    if (extractorPower === 'yes' && extractorPowerConsumption > 0 && usageTime > 0) {
      emissions += extractorPowerConsumption * usageTime * electricityEmissionFactor;
    }

    setMonthlyEmissions(emissions);
  }, [extractionData]);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Extraction Stage</h2>

      {/* Grinder Type */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Type of Grinder</label>
        <div className="mb-2">
          <label className="mr-4">
            <input
              type="radio"
              name="grinderType"
              value="electric"
              checked={extractionData.grinderType === 'electric'}
              onChange={handleRadioChange}
            />
            Electric
          </label>
          <label>
            <input
              type="radio"
              name="grinderType"
              value="manual"
              checked={extractionData.grinderType === 'manual'}
              onChange={handleRadioChange}
            />
            Manual
          </label>
        </div>
      </div>

      {/* Grinder Power Consumption */}
      {extractionData.grinderType === 'electric' && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Grinder Power Consumption (kW)</label>
          <input
            type="number"
            name="powerConsumption"
            value={extractionData.powerConsumption}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter power consumption in kW"
          />
        </div>
      )}

      {/* Grinder Usage Time */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Grinder Usage Time (hrs)</label>
        <input
          type="number"
          name="usageTime"
          value={extractionData.usageTime}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter usage time in hours"
        />
      </div>

      {/* Grinder Production Quantity */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Grinder Production Quantity (kg)</label>
        <input
          type="number"
          name="productionQuantity"
          value={extractionData.productionQuantity}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter production quantity in kg"
        />
      </div>

      {/* Extractor Power Usage */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Is Extractor Power Used?</label>
        <div className="mb-2">
          <label className="mr-4">
            <input
              type="radio"
              name="extractorPower"
              value="yes"
              checked={extractionData.extractorPower === 'yes'}
              onChange={handleRadioChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="extractorPower"
              value="no"
              checked={extractionData.extractorPower === 'no'}
              onChange={handleRadioChange}
            />
            No
          </label>
        </div>
      </div>

      {/* Extractor Power Consumption */}
      {extractionData.extractorPower === 'yes' && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Extractor Power Consumption (kW)</label>
          <input
            type="number"
            name="extractorPowerConsumption"
            value={extractionData.extractorPowerConsumption}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter power consumption in kW"
          />
        </div>
      )}

      {/* Extractor Usage Time */}
      {extractionData.extractorPower === 'yes' && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Extractor Usage Time (hrs)</label>
          <input
            type="number"
            name="extractorUsageTime"
            value={extractionData.extractorUsageTime}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter usage time in hours"
          />
        </div>
      )}

      {/* Extractor Production Quantity */}
      {extractionData.extractorPower === 'yes' && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Extractor Production Quantity (kg)</label>
          <input
            type="number"
            name="extractorProductionQuantity"
            value={extractionData.extractorProductionQuantity}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter production quantity in kg"
          />
        </div>
      )}

      {/* Monthly Carbon Emissions Display */}
      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <h3 className="text-lg font-semibold">Monthly Carbon Emissions at this Stage</h3>
        <p className="text-xl">{monthlyEmissions.toFixed(2)} kg CO₂</p>
      </div>
    </div>
  );
}
