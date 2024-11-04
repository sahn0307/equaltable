// src/app/stages/ProductionStage.js
"use client";

export default function ProductionStage({ productionData, setProductionData }) {
  // Handle input changes for production stage
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
    </div>
  );
}
