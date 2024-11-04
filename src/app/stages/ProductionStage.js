// src/app/stages/ProductionStage.js
"use client";

import { useEffect, useState } from 'react';

export default function ProductionStage({ productionData, setProductionData }) {
  // Local state for monthly emissions at this stage
  const [monthlyEmissions, setMonthlyEmissions] = useState(0);

  // Handle input changes for production stage
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductionData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  // Calculate monthly emissions whenever productionData changes
  useEffect(() => {
    const { monthlyCoffeeUsage, carbonEmissionsPerKg } = productionData;

    // Calculate emissions only if values are positive numbers
    if (monthlyCoffeeUsage > 0 && carbonEmissionsPerKg > 0) {
      setMonthlyEmissions(monthlyCoffeeUsage * carbonEmissionsPerKg);
    } else {
      setMonthlyEmissions(0);
    }
  }, [productionData]);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Production Stage</h2>

      {/* Monthly Coffee Usage */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Monthly Coffee Usage (kg)</label>
        <input
          type="number"
          name="monthlyCoffeeUsage"
          value={productionData.monthlyCoffeeUsage}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter monthly coffee usage in kg"
        />
      </div>

      {/* Carbon Emissions from Farm */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Carbon Emissions from Farm (kg CO₂ per kg of roasted beans)</label>
        <input
          type="number"
          name="carbonEmissionsPerKg"
          value={productionData.carbonEmissionsPerKg}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter emissions per kg of roasted beans"
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
