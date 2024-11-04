// src/app/stages/TransportationStage.js
"use client";

import { useEffect, useState } from 'react';

export default function TransportationStage({ transportData, setTransportData }) {
  // Local state for monthly emissions at this stage
  const [monthlyEmissions, setMonthlyEmissions] = useState(0);

  // Handle input changes for the transportation stage
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransportData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  // Handle select changes for the transport type
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

  // Emission factors for different types of transport
  const getTransportEmissionFactor = (type) => {
    switch (type) {
      case 'truck':
        return 0.2; // kg CO₂ per km
      case 'train':
        return 0.1; // kg CO₂ per km
      case 'ship':
        return 0.015; // kg CO₂ per km
      case 'flight':
        return 0.9; // kg CO₂ per km
      default:
        return 0;
    }
  };

  // Calculate monthly emissions whenever transportData changes
  useEffect(() => {
    const {
      farmToPortDistance,
      portToDomesticDistance,
      domesticDistance,
      transportType,
    } = transportData;

    // Calculate emissions for each transport segment
    const farmToPortEmissions =
      (farmToPortDistance > 0 ? farmToPortDistance : 0) *
      getTransportEmissionFactor(transportType.farmToPort);
    const portToDomesticEmissions =
      (portToDomesticDistance > 0 ? portToDomesticDistance : 0) *
      getTransportEmissionFactor(transportType.portToDomestic);
    const domesticEmissions =
      (domesticDistance > 0 ? domesticDistance : 0) *
      getTransportEmissionFactor(transportType.domestic);

    // Total emissions for the transportation stage
    const totalEmissions = farmToPortEmissions + portToDomesticEmissions + domesticEmissions;

    setMonthlyEmissions(totalEmissions);
  }, [transportData]);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Transportation Stage</h2>

      {/* Farm to Port Distance */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Distance from Farm to Port (km)</label>
        <select
          name="farmToPort"
          value={transportData.transportType.farmToPort}
          onChange={handleSelectChange}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="truck">Truck</option>
          <option value="train">Train</option>
          <option value="ship">Ship</option>
          <option value="flight">Flight</option>
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
        <label className="block font-medium mb-2">Distance from Port to Domestic Location (km)</label>
        <select
          name="portToDomestic"
          value={transportData.transportType.portToDomestic}
          onChange={handleSelectChange}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="truck">Truck</option>
          <option value="train">Train</option>
          <option value="ship">Ship</option>
          <option value="flight">Flight</option>
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
        <label className="block font-medium mb-2">Distance from Domestic Port to Roasting Factory (km)</label>
        <select
          name="domestic"
          value={transportData.transportType.domestic}
          onChange={handleSelectChange}
          className="w-full p-2 border rounded mb-2"
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

      {/* Monthly Carbon Emissions Display */}
      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <h3 className="text-lg font-semibold">Monthly Carbon Emissions at this Stage</h3>
        <p className="text-xl">{monthlyEmissions.toFixed(2)} kg CO₂</p>
      </div>
    </div>
  );
}
