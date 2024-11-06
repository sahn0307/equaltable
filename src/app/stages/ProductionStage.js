// src/app/stages/ProductionStage.js
"use client";
import '../styles/ProductionStage.scss';
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
    <div>
        <h2>Production Stage</h2>

        {/* Monthly Coffee Usage */}
        <div>
            <label>Monthly Coffee Usage (kg)</label>
            <input
                type="number"
                name="monthlyCoffeeUsage"
                value={productionData.monthlyCoffeeUsage}
                onChange={handleInputChange}
                placeholder="Enter monthly coffee usage in kg"
            />
        </div>

        {/* Carbon Emissions from Farm */}
        <div>
            <label>Carbon Emissions from Farm (kg CO₂ per kg of roasted beans)</label>
            <input
                type="number"
                name="carbonEmissionsPerKg"
                value={productionData.carbonEmissionsPerKg}
                onChange={handleInputChange}
                placeholder="Enter emissions per kg of roasted beans"
            />
        </div>

        {/* Monthly Carbon Emissions Display */}
        <div>
            <h3>Monthly Carbon Emissions at this Stage</h3>
            <p>{monthlyEmissions.toFixed(2)} kg CO₂</p>
        </div>
    </div>
);
}
