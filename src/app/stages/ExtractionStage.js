// src/app/stages/ExtractionStage.js
"use client";

export default function ExtractionStage({ extractionData, setExtractionData }) {
  // Handle input changes for extraction stage
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExtractionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Extraction Stage</h2>
      
      {/* Grinder Type */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Type of Grinder</label>
        <select
          name="grinderType"
          value={extractionData.grinderType}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="electric">Electric</option>
          <option value="manual">Manual</option>
        </select>
      </div>

      {/* Power Consumption - Only shown if grinder type is electric */}
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
        <select
          name="extractorPower"
          value={extractionData.extractorPower}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {/* Extractor Power Consumption - Only shown if extractor power is used */}
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
    </div>
  );
}
