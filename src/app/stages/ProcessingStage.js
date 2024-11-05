// src/app/stages/ProcessingStage.js
"use client";

import { useEffect, useState } from 'react';

export default function ProcessingStage({ processingData, setProcessingData }) {
  // Local state for monthly emissions at this stage
  const [monthlyEmissions, setMonthlyEmissions] = useState(0);

  // Handle input changes for processing stage
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProcessingData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value) || 0,
    }));
  };

  // Handle radio button changes for the roaster and smoke eliminator types
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setProcessingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Calculate monthly emissions whenever processingData changes
  useEffect(() => {
    const {
      roasterType = "",
      powerConsumption = 0,
      gasConsumption = 0,
      usageTime = 0,
      smokeEliminator = "",
      smokeEliminatorPowerConsumption = 0,
      afterburnerPowerConsumption = 0,
      afterburnerGasConsumption = 0,
      afterburnerUsageTime = 0,
    } = processingData;

    let emissions = 0;
    const electricityEmissionFactor = 0.495; // kg CO₂ per kWh
    const gasEmissionFactor = 0.23; // kg CO₂ per kcal

    if (roasterType === 'electric' && powerConsumption > 0 && usageTime > 0) {
      emissions += powerConsumption * usageTime * electricityEmissionFactor;
    } else if (roasterType === 'gas' && gasConsumption > 0 && usageTime > 0) {
      emissions += gasConsumption * usageTime * gasEmissionFactor;
    }

    if (smokeEliminator === 'smokeEliminator' && smokeEliminatorPowerConsumption > 0) {
      emissions += smokeEliminatorPowerConsumption * electricityEmissionFactor;
    } else if (smokeEliminator === 'afterburner') {
      if (afterburnerPowerConsumption > 0 && afterburnerUsageTime > 0) {
        emissions += afterburnerPowerConsumption * afterburnerUsageTime * electricityEmissionFactor;
      }
      if (afterburnerGasConsumption > 0 && afterburnerUsageTime > 0) {
        emissions += afterburnerGasConsumption * afterburnerUsageTime * gasEmissionFactor;
      }
    }

    setMonthlyEmissions(emissions);
  }, [processingData]);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Processing Stage</h2>

      {/* Type of Roaster */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Type of Roaster</label>
        <div className="mb-2">
          <label className="mr-4">
            <input
              type="radio"
              name="roasterType"
              value="electric"
              checked={processingData.roasterType === 'electric'}
              onChange={handleRadioChange}
            />
            Electric
          </label>
          <label>
            <input
              type="radio"
              name="roasterType"
              value="gas"
              checked={processingData.roasterType === 'gas'}
              onChange={handleRadioChange}
            />
            Gas
          </label>
        </div>
      </div>

      {/* Roaster Power Consumption */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Roaster Power Consumption (kcal)</label>
        <input
          type="number"
          name="powerConsumption"
          value={processingData.powerConsumption ?? 0}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter power consumption in kcal"
        />
      </div>

      {/* Roaster Gas Consumption */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Roaster Gas Consumption (kcal/hr)</label>
        <input
          type="number"
          name="gasConsumption"
          value={processingData.gasConsumption ?? 0}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter gas consumption in kcal/hr"
        />
      </div>

      {/* Roaster Usage Time */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Roaster Usage Time (hrs)</label>
        <input
          type="number"
          name="usageTime"
          value={processingData.usageTime ?? 0}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter usage time in hours"
        />
      </div>

      {/* Roaster Production Quantity */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Roaster Production Quantity (kg)</label>
        <input
          type="number"
          name="productionQuantity"
          value={processingData.productionQuantity ?? 0}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter production quantity in kg"
        />
      </div>

      {/* Smoke Eliminator Type */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Smoke Eliminator Type</label>
        <div className="mb-2">
          <label className="mr-4">
            <input
              type="radio"
              name="smokeEliminator"
              value="smokeEliminator"
              checked={processingData.smokeEliminator === 'smokeEliminator'}
              onChange={handleRadioChange}
            />
            Smoke Eliminator
          </label>
          <label className="mr-4">
            <input
              type="radio"
              name="smokeEliminator"
              value="afterburner"
              checked={processingData.smokeEliminator === 'afterburner'}
              onChange={handleRadioChange}
            />
            Afterburner
          </label>
          <label>
            <input
              type="radio"
              name="smokeEliminator"
              value="notInUse"
              checked={processingData.smokeEliminator === 'notInUse'}
              onChange={handleRadioChange}
            />
            Not in Use
          </label>
        </div>
      </div>

      {/* Smoke Eliminator Power Consumption */}
      {processingData.smokeEliminator === 'smokeEliminator' && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Smoke Eliminator Power Consumption (kW)</label>
          <input
            type="number"
            name="smokeEliminatorPowerConsumption"
            value={processingData.smokeEliminatorPowerConsumption ?? 0}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter power consumption in kW"
          />
        </div>
      )}

      {/* Afterburner Power Consumption */}
      {processingData.smokeEliminator === 'afterburner' && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Afterburner Power Consumption (kW)</label>
          <input
            type="number"
            name="afterburnerPowerConsumption"
            value={processingData.afterburnerPowerConsumption ?? 0}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter power consumption in kW"
          />
        </div>
      )}

      {/* Afterburner Gas Consumption */}
      {processingData.smokeEliminator === 'afterburner' && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Afterburner Gas Consumption (kcal/hr)</label>
          <input
            type="number"
            name="afterburnerGasConsumption"
            value={processingData.afterburnerGasConsumption ?? 0}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter gas consumption in kcal/hr"
          />
        </div>
      )}

      {/* Afterburner Usage Time */}
      {processingData.smokeEliminator === 'afterburner' && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Afterburner Usage Time (hrs)</label>
          <input
            type="number"
            name="afterburnerUsageTime"
            value={processingData.afterburnerUsageTime ?? 0}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter usage time in hours"
          />
        </div>
      )}

      {/* Afterburner Production Quantity */}
      {processingData.smokeEliminator === 'afterburner' && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Afterburner Production Quantity (kg)</label>
          <input
            type="number"
            name="afterburnerProductionQuantity"
            value={processingData.afterburnerProductionQuantity ?? 0}
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
