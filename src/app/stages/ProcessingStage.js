// src/app/stages/ProcessingStage.js
"use client";

export default function ProcessingStage({ processingData, setProcessingData }) {
  // Handle input changes for processing stage
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProcessingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

      {/* Power Consumption */}
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

      {/* Production Quantity */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Roaster Production Quantity (kg)</label>
        <input
          type="number"
          name="productionQuantity"
          value={processingData.productionQuantity}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter production quantity in kg"
        />
      </div>

      {/* Smoke Eliminator */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Smoke Eliminator</label>
        <select
          name="smokeEliminator"
          value={processingData.smokeEliminator}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="none">Not in use</option>
          <option value="smoke">Smoke Eliminator</option>
          <option value="afterburner">Afterburner</option>
        </select>
      </div>
    </div>
  );
}
