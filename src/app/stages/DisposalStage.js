// src/app/stages/DisposalStage.js
"use client";

export default function DisposalStage({ disposalData, setDisposalData }) {
  // Handle input changes for disposal stage
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDisposalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Disposal Stage</h2>

      {/* Waste Mass */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Waste Mass (kg)</label>
        <input
          type="number"
          name="wasteMass"
          value={disposalData.wasteMass}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter waste mass in kg"
        />
      </div>

      {/* Packaging Type */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Packaging Type</label>
        <select
          name="packagingType"
          value={disposalData.packagingType}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="LDPE">LDPE</option>
          <option value="Aluminum Foil">Aluminum Foil</option>
          <option value="PET">PET</option>
          <option value="Paper">Paper</option>
        </select>
      </div>

      {/* Disposal Method */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Disposal Method</label>
        <select
          name="disposalMethod"
          value={disposalData.disposalMethod}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="landfill">Landfill</option>
          <option value="incineration">Incineration</option>
          <option value="recycling">Recycling</option>
        </select>
      </div>

      {/* Is Waste Recycled or Upcycled */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Is Waste Recycled or Upcycled?</label>
        <select
          name="isRecycled"
          value={disposalData.isRecycled}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
    </div>
  );
}
