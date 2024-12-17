import React, { useMemo, useEffect, useRef } from 'react';
import Chart from 'chart.js';

const EmissionsBreakdown = ({ 
  productionData = {},
  transportData = {},
  processingData = {},
  extractionData = {},
  disposalData = {}
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const calculations = useMemo(() => {
    // Production emissions (coffee cultivation)
    const productionEmissions = productionData?.carbonEmissionsPerKg || 0;

    // Transport emissions calculation
    const farmToPortEmission = (transportData?.transportType?.farmToPort === 'truck' ? 0.062 : 0.602);
    const portToDomesticEmission = (transportData?.transportType?.portToDomestic === 'truck' ? 0.062 : 0.602);
    const domesticEmission = (transportData?.transportType?.domestic === 'truck' ? 0.062 : 0.602);

    const transportEmissions = (
      ((transportData?.farmToPortDistance || 0) * farmToPortEmission) +
      ((transportData?.portToDomesticDistance || 0) * portToDomesticEmission) +
      ((transportData?.domesticDistance || 0) * domesticEmission)
    );

    // Processing emissions
    const processingPower = processingData?.powerConsumption || 0;
    const processingTime = processingData?.usageTime || 0;
    const processingQuantity = processingData?.productionQuantity || 1;
    const gasConsumption = processingData?.gasConsumption || 0;
    
    const processingEmissions = (
      ((processingData?.roasterType === 'electric' ? 
        (processingPower * processingTime) : 
        (gasConsumption * processingTime)) / processingQuantity) +
      (processingData?.smokeEliminator === 'yes' ? 0.1 : 0)
    );

    // Extraction emissions
    const extractionPower = extractionData?.powerConsumption || 0;
    const extractionTime = extractionData?.usageTime || 0;
    const extractionQuantity = extractionData?.productionQuantity || 1;
    
    const extractionEmissions = (
      ((extractionPower * extractionTime) / extractionQuantity) +
      (extractionData?.extractorPower === 'yes' ? (extractionData?.extractorPowerConsumption || 0) : 0)
    );

    // Disposal emissions
    const disposalEmissions = (
      (disposalData?.upcyclingStatus === 'no' ? (disposalData?.coffeeWasteEmissions || 0) : 0) +
      (disposalData?.packagingUsed === 'yes' ? (disposalData?.packagingEmissions || 0) : 0)
    );

    const total = productionEmissions + transportEmissions + processingEmissions + 
                 extractionEmissions + disposalEmissions;

    // Calculate actual percentages
    const getPercentage = (value) => total === 0 ? 0 : (value / total * 100);

    return {
      stages: {
        'Production Stage': { 
          value: productionEmissions, 
          percentage: getPercentage(productionEmissions)
        },
        'Transportation Stage': { 
          value: transportEmissions, 
          percentage: getPercentage(transportEmissions)
        },
        'Processing Stage': { 
          value: processingEmissions, 
          percentage: getPercentage(processingEmissions)
        },
        'Extraction Stage': { 
          value: extractionEmissions, 
          percentage: getPercentage(extractionEmissions)
        },
        'Disposal Stage': { 
          value: disposalEmissions, 
          percentage: getPercentage(disposalEmissions)
        }
      },
      total,
      chartData: {
        labels: ['', '', '', '', ''],
        datasets: [{
          data: [
            productionEmissions,
            productionEmissions + transportEmissions,
            productionEmissions + transportEmissions + processingEmissions,
            productionEmissions + transportEmissions + processingEmissions + extractionEmissions,
            total
          ],
          fill: true,
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return;
            
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, 'rgba(251, 146, 60, 0.2)');
            gradient.addColorStop(1, 'rgba(251, 146, 60, 0.6)');
            return gradient;
          },
          borderColor: 'rgb(251, 146, 60)',
          tension: 0,
          pointRadius: 4,
          pointBackgroundColor: 'rgb(251, 146, 60)',
          label: ''
        }]
      }
    };
  }, [
    productionData?.carbonEmissionsPerKg,
    transportData?.transportType?.farmToPort,
    transportData?.transportType?.portToDomestic,
    transportData?.transportType?.domestic,
    transportData?.farmToPortDistance,
    transportData?.portToDomesticDistance,
    transportData?.domesticDistance,
    processingData?.powerConsumption,
    processingData?.usageTime,
    processingData?.productionQuantity,
    processingData?.gasConsumption,
    processingData?.roasterType,
    processingData?.smokeEliminator,
    extractionData?.powerConsumption,
    extractionData?.usageTime,
    extractionData?.productionQuantity,
    extractionData?.extractorPower,
    extractionData?.extractorPowerConsumption,
    disposalData?.upcyclingStatus,
    disposalData?.coffeeWasteEmissions,
    disposalData?.packagingUsed,
    disposalData?.packagingEmissions
  ]);

  const config = useMemo(() => ({
    type: 'line',
    data: calculations.chartData,
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        title: {
          display: false
        },
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
            drawBorder: false,
            drawTicks: false,
            display: false
          },
          ticks: {
            padding: 10,
            color: "#6B7280",
            font: {
              size: 11
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            display: false
          },
          border: {
            display: false
          }
        }
      },
      elements: {
        line: {
          borderWidth: 2
        }
      }
    }
  }), [calculations.chartData]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, config);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [config]);

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="text-lg font-semibold mb-2">
        {calculations.total.toFixed(2)} kg
      </div>
      
      <div className="h-64 mb-6">
        <canvas ref={chartRef}></canvas>
      </div>
      
      <div className="space-y-4">
        {Object.entries(calculations.stages).map(([stage, { value, percentage }]) => (
          <div key={stage} className="flex items-center justify-between text-sm">
            <span className="text-gray-700">{stage}</span>
            <span className="text-gray-500">{percentage.toFixed(1)}%</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        The graph represents carbon emissions per kilogram of green beans
      </div>
    </div>
  );
};

export default EmissionsBreakdown;