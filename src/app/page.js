// src/app/page.js
"use client";

import { useState } from 'react';
import ProductionStage from './stages/ProductionStage';
import TransportationStage from './stages/TransportationStage';
import ProcessingStage from './stages/ProcessingStage';
import ExtractionStage from './stages/ExtractionStage';
import DisposalStage from './stages/DisposalStage';
import EmissionSummary from './stages/EmissionSummary';

export default function Home() {
  // Initialize each state with all required fields and provide default values
  const [productionData, setProductionData] = useState({
    monthlyCoffeeUsage: 0,
    carbonEmissionsPerKg: 0,
  });

  const [transportData, setTransportData] = useState({
    farmToPortDistance: 0,
    portToDomesticDistance: 0,
    domesticDistance: 0,
    transportType: {
      farmToPort: 'truck',
      portToDomestic: 'ship',
      domestic: 'truck',
    },
  });

  const [processingData, setProcessingData] = useState({
    roasterType: 'electric',
    powerConsumption: 0,
    gasConsumption: 0,
    usageTime: 0,
    productionQuantity: 0,
    smokeEliminator: 'none',
  });

  const [extractionData, setExtractionData] = useState({
    grinderType: 'electric',
    powerConsumption: 0,
    usageTime: 0,
    productionQuantity: 0,
    extractorPower: 'no',
    extractorPowerConsumption: 0,
  });

  const [disposalData, setDisposalData] = useState({
    wasteMass: 0,
    packagingType: 'LDPE',
    disposalMethod: 'landfill',
    isRecycled: 'no',
  });

  // State to manage if summary should be displayed
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState({});

  // Function to show results summary
  const handleShowSummary = () => {
    // Capture the latest data
    setSummaryData({
      productionData,
      transportData,
      processingData,
      extractionData,
      disposalData,
    });
    setShowSummary(true);
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-xl font-semibold mb-4">Welcome to the Carbon Emissions Calculator</h2>
      <p>Use this tool to measure the carbon emissions from coffee production to disposal.</p>

      <div className="mt-8">
        {/* Render all stages on the same page and pass down state and setters */}
        <ProductionStage productionData={productionData} setProductionData={setProductionData} />
        <div className="mt-8">
          <TransportationStage transportData={transportData} setTransportData={setTransportData} />
        </div>
        <div className="mt-8">
          <ProcessingStage processingData={processingData} setProcessingData={setProcessingData} />
        </div>
        <div className="mt-8">
          <ExtractionStage extractionData={extractionData} setExtractionData={setExtractionData} />
        </div>
        <div className="mt-8">
          <DisposalStage disposalData={disposalData} setDisposalData={setDisposalData} />
        </div>
      </div>

      {/* Button to show the emission summary */}
      <div className="mt-8 text-center">
        <button
          onClick={handleShowSummary}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Calculate Total Emissions
        </button>
      </div>

      {/* Emission Summary Display */}
      {showSummary && (
        <div className="mt-8">
          <EmissionSummary
            productionData={summaryData.productionData}
            transportData={summaryData.transportData}
            processingData={summaryData.processingData}
            extractionData={summaryData.extractionData}
            disposalData={summaryData.disposalData}
          />
        </div>
      )}
    </div>
  );
}
