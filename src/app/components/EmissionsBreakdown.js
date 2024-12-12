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
    // [Previous calculations remain the same]
    const productionEmissions = productionData?.carbonEmissionsPerKg || 0;
    const transportEmissions = /* [Previous transport calculation] */ 0;
    const processingEmissions = /* [Previous processing calculation] */ 0;
    const extractionEmissions = /* [Previous extraction calculation] */ 0;
    const disposalEmissions = /* [Previous disposal calculation] */ 0;
    const total = productionEmissions + transportEmissions + processingEmissions + 
                 extractionEmissions + disposalEmissions;

    return {
      stages: {
        'Production Stage': { value: productionEmissions, percentage: 50 },
        'Transportation Stage': { value: transportEmissions, percentage: 25 },
        'Processing Stage': { value: processingEmissions, percentage: 15 },
        'Extraction Stage': { value: extractionEmissions, percentage: 10 },
        'Disposal Stage': { value: disposalEmissions, percentage: 10 }
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
          label: '' // Empty label to remove 'undefined'
        }]
      }
    };
  }, [productionData, transportData, processingData, extractionData, disposalData]);

  const config = {
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
  };

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
  }, [calculations]);

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
            <span className="text-gray-500">{percentage}%</span>
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