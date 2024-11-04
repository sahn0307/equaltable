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
      [name]: parseFloat(value),
    }));
  };

  // Calculate monthly emissions whenever processingData changes
  useEffect(() => {
    const { roasterType, powerConsumption, gasConsumption, usageTime } = processingData;

    let emissions = 0;
    const electricityEmissionFactor = 0.495; // kg CO₂ per kWh
    const gasEmissionFactor = 0.23; // kg CO₂ per kcal

    if (roasterType === 'electric' && powerConsumption > 0 && usageTime > 0) {
      emissions = powerConsumption * usageTime * electricityEmissionFactor;
    } else if (roasterType === 'gas' && gasConsumption > 0 && usageTime > 0) {
      emissions = gasConsumption * usageTime * gasEmissionFactor;
    }

    setMonthlyEmissions(emissions);
  }, [processingData]);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Processing Stage</h2>

      {/* Roaster Type */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Type of Roaster</label>
        <select
          name="roasterType"
          value={processingData.roasterType}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="electric">Electric</option>
          <option value="gas">Gas</option>
        </select>
      </div>

      {/* Power Consumption - Only shown if roaster type is electric */}
      {processingData.roasterType === 'electric' && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Roaster Power Consumption (kW)</label>
          <input
            type="number"
            name="powerConsumption"
            value={processingData.powerConsumption}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter power consumption in kW"
          />
        </div>
      )}

      {/* Gas Consumption - Only shown if roaster type is gas */}
      {processingData.roasterType === 'gas' && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Gas Consumption (kcal/hr)</label>
          <input
            type="number"
            name="gasConsumption"
            value={processingData.gasConsumption}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter gas consumption in kcal/hr"
          />
        </div>
      )}

      {/* Roaster Usage Time */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Roaster Usage Time (hrs)</label>
        <input
          type="number"
          name="usageTime"
          value={processingData.usageTime}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter usage time in hours"
        />
      </div>

      {/* Monthly Carbon Emissions Display */}
      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <h3 className="text-lg font-semibold">Monthly Carbon Emissions at this Stage</h3>
        <p className="text-xl">{monthlyEmissions.toFixed(2)} kg CO₂</p>
      </div>
    </div>
  );
}
