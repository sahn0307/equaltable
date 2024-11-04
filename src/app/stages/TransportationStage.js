// src/app/stages/TransportationStage.js
"use client";

export default function TransportationStage({ transportData, setTransportData }) {
  // Handle changes for distance inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransportData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle changes for transport type selectors
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setTransportData((prevData) => ({
      ...prevData,
      transportType: {
        ...prevData.transportType,
        [name]: value,
      },
    }));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Transportation Stage</h2>

      {/* Farm to Port Distance */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Distance from farm to the airport or port (km)</label>
        <select
          name="farmToPort"
          value={transportData.transportType.farmToPort}
          onChange={handleSelectChange}
          className="p-2 border rounded mb-2"
        >
          <option value="truck">Truck</option>
          <option value="train">Train</option>
        </select>
        <input
          type="number"
          name="farmToPortDistance"
          value={transportData.farmToPortDistance}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter distance in km"
        />
      </div>

      {/* Port to Domestic Distance */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Distance from port to domestic port or airport (km)</label>
        <select
          name="portToDomestic"
          value={transportData.transportType.portToDomestic}
          onChange={handleSelectChange}
          className="p-2 border rounded mb-2"
        >
          <option value="flight">Flight</option>
          <option value="ship">Ship</option>
        </select>
        <input
          type="number"
          name="portToDomesticDistance"
          value={transportData.portToDomesticDistance}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter distance in km"
        />
      </div>

      {/* Domestic Distance */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Distance from domestic port to roasting factory (km)</label>
        <select
          name="domestic"
          value={transportData.transportType.domestic}
          onChange={handleSelectChange}
          className="p-2 border rounded mb-2"
        >
          <option value="truck">Truck</option>
          <option value="train">Train</option>
        </select>
        <input
          type="number"
          name="domesticDistance"
          value={transportData.domesticDistance}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter distance in km"
        />
      </div>
    </div>
  );
}
