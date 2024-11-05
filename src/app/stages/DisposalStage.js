// src/app/stages/DisposalStage.js
"use client";

import { useEffect, useState } from 'react';

export default function DisposalStage({ disposalData, setDisposalData }) {
  // Local state for monthly emissions at this stage
  const [monthlyEmissions, setMonthlyEmissions] = useState(0);

  // Handle input changes for disposal stage
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDisposalData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  // Handle radio button changes for upcycling status and packaging use
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setDisposalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Calculate monthly emissions whenever disposalData changes
  useEffect(() => {
    const { coffeeWasteEmissions, packagingEmissions, upcyclingStatus, packagingUsed } = disposalData;

    let emissions = 0;
    if (upcyclingStatus === 'no' && coffeeWasteEmissions > 0) {
      emissions += coffeeWasteEmissions;
    }
    if (packagingUsed === 'yes' && packagingEmissions > 0) {
      emissions += packagingEmissions;
    }

    setMonthlyEmissions(emissions);
  }, [disposalData]);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Disposal Stage</h2>

      {/* Upcycling Status */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Upcycling Status</label>
        <div className="mb-2">
          <label className="mr-4">
            <input
              type="radio"
              name="upcyclingStatus"
              value="yes"
              checked={disposalData.upcyclingStatus === 'yes'}
              onChange={handleRadioChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="upcyclingStatus"
              value="no"
              checked={disposalData.upcyclingStatus === 'no'}
              onChange={handleRadioChange}
            />
            No
          </label>
        </div>
      </div>

      {/* Coffee Grounds Waste Emissions */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Carbon Emissions of Coffee Grounds Waste per 1kg of Coffee Beans (kg)</label>
        <input
          type="number"
          name="coffeeWasteEmissions"
          value={disposalData.coffeeWasteEmissions || 0.34}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter carbon emissions for coffee grounds waste"
        />
      </div>

      {/* Packaging Usage */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Use Packaging for 1kg of Coffee Bean?</label>
        <div className="mb-2">
          <label className="mr-4">
            <input
              type="radio"
              name="packagingUsed"
              value="yes"
              checked={disposalData.packagingUsed === 'yes'}
              onChange={handleRadioChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="packagingUsed"
              value="no"
              checked={disposalData.packagingUsed === 'no'}
              onChange={handleRadioChange}
            />
            No
          </label>
        </div>
      </div>

      {/* Packaging Emissions */}
      {disposalData.packagingUsed === 'yes' && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Carbon Emissions from Coffee Packaging Waste (kg)</label>
          <input
            type="number"
            name="packagingEmissions"
            value={disposalData.packagingEmissions || 0.049}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter carbon emissions from packaging waste"
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
