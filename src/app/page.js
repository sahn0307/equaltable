// src/app/page.js
"use client";

import { useState } from 'react';
import EmissionInput from './components/EmissionInput';
import Results from './components/Results';

export default function Home() {
  // User input data (without emission factors)
  const [transportData, setTransportData] = useState({ distance: 0 });
  const [manufacturingData, setManufacturingData] = useState({ power: 0, time: 0 });
  const [usageData, setUsageData] = useState({ power: 0, time: 0 });
  const [wasteData, setWasteData] = useState({ mass: 0 });

  // Emission factors (hidden constants)
  const TRANSPORT_EMISSION_FACTOR = 0.1942; // kg CO₂/t-km
  const MANUFACTURING_EMISSION_FACTOR = 0.495; // kg CO₂/kWh
  const USAGE_EMISSION_FACTOR = 0.495; // kg CO₂/kWh
  const WASTE_LANDFILL_FACTOR = 0.4551; // kg CO₂/kg
  const WASTE_INCINERATION_FACTOR = 1.182; // kg CO₂/kg

  // Calculate emissions based on input data and constants
  const calculateEmissions = () => {
    const transportEmission = transportData.distance * TRANSPORT_EMISSION_FACTOR;
    const manufacturingEmission = manufacturingData.power * manufacturingData.time * MANUFACTURING_EMISSION_FACTOR;
    const usageEmission = usageData.power * usageData.time * USAGE_EMISSION_FACTOR;
    const wasteEmission = wasteData.mass * ((WASTE_LANDFILL_FACTOR + WASTE_INCINERATION_FACTOR) / 2);

    return {
      transport: transportEmission,
      manufacturing: manufacturingEmission,
      usage: usageEmission,
      waste: wasteEmission,
      total: transportEmission + manufacturingEmission + usageEmission + wasteEmission
    };
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Carbon Emissions Calculator</h1>

      {/* Input Sections without emission factor fields */}
      <EmissionInput 
        title="Transport" 
        data={transportData} 
        setData={setTransportData} 
        fields={["distance"]} 
        units={["km"]} // Only show "distance" field
      />
      <EmissionInput 
        title="Manufacturing" 
        data={manufacturingData} 
        setData={setManufacturingData} 
        fields={["power", "time"]} 
        units={["kW", "hr"]} // Only show "power" and "time" fields
      />
      <EmissionInput 
        title="Usage" 
        data={usageData} 
        setData={setUsageData} 
        fields={["power", "time"]} 
        units={["kW", "hr"]} // Only show "power" and "time" fields
      />
      <EmissionInput 
        title="Waste" 
        data={wasteData} 
        setData={setWasteData} 
        fields={["mass"]} 
        units={["kg"]} // Only show "mass" field
      />

      {/* Results */}
      <Results emissions={calculateEmissions()} />
    </div>
  );
}
