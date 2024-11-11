// src/app/stages/ExtractionStage.js
'use client'

import { useEffect, useState } from 'react'

export default function ExtractionStage({ extractionData, setExtractionData, setStageCompleted }) {
    // Local state for monthly emissions at this stage
    const [monthlyEmissions, setMonthlyEmissions] = useState(0)

    // Handle input changes for the extraction stage
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setExtractionData((prevData) => ({
            ...prevData,
            [name]: parseFloat(value) || 0
        }))
    }

    // Handle radio button changes for the grinder and extractor types
    const handleRadioChange = (e) => {
        const { name, value } = e.target
        setExtractionData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    // Calculate monthly emissions whenever extractionData changes
    useEffect(() => {
        const {
            grinderType,
            powerConsumption,
            usageTime,
            extractorPower,
            extractorPowerConsumption
        } = extractionData

        let emissions = 0
        const electricityEmissionFactor = 0.495 // kg CO₂ per kWh

        if (grinderType === 'electric' && powerConsumption > 0 && usageTime > 0) {
            emissions += powerConsumption * usageTime * electricityEmissionFactor
        }

        if (extractorPower === 'yes' && extractorPowerConsumption > 0) {
            emissions += extractorPowerConsumption * electricityEmissionFactor
        }

        setMonthlyEmissions(emissions)
    }, [extractionData])

    // Check if all fields are filled out
    useEffect(() => {
        const {
            grinderType,
            powerConsumption,
            usageTime,
            productionQuantity,
            extractorPower,
            extractorPowerConsumption
        } = extractionData

        const isCompleted = grinderType && usageTime > 0 && productionQuantity > 0 &&
            (grinderType === 'electric' ? powerConsumption > 0 : true) &&
            (extractorPower === 'yes' ? extractorPowerConsumption > 0 : true)

        setStageCompleted(isCompleted)
    }, [extractionData, setStageCompleted])

    return (
        <section className='stage-column'>
            <h3>Extraction Stage</h3>
            {/* Grinder Type */}
            <div className='question-group'>
                <label>Grinder Type</label>
                <div className='radio-group'>
                    <label>
                        <input
                            type='radio'
                            name='grinderType'
                            value='electric'
                            checked={extractionData.grinderType === 'electric'}
                            onChange={handleRadioChange}
                        />
                        Electric
                    </label>
                    <label>
                        <input
                            type='radio'
                            name='grinderType'
                            value='manual'
                            checked={extractionData.grinderType === 'manual'}
                            onChange={handleRadioChange}
                        />
                        Manual
                    </label>
                </div>
            </div>

            {/* Grinder Power Consumption - Only displayed if Electric Grinder is selected */}
            {extractionData.grinderType === 'electric' && (
                <div className='question-group'>
                    <label>Grinder Power Consumption (kW)</label>
                    <input
                        type='number'
                        name='powerConsumption'
                        value={extractionData.powerConsumption ?? 0}
                        onChange={handleInputChange}
                        placeholder='Enter power consumption in kW'
                    />
                </div>
            )}

            {/* Grinder Usage Time */}
            <div className='question-group'>
                <label>Grinder Usage Time (hrs)</label>
                <input
                    type='number'
                    name='usageTime'
                    value={extractionData.usageTime ?? 0}
                    onChange={handleInputChange}
                    placeholder='Enter usage time in hours'
                />
            </div>

            {/* Grinder Production Quantity */}
            <div className='question-group'>
                <label>Grinder Production Quantity (kg)</label>
                <input
                    type='number'
                    name='productionQuantity'
                    value={extractionData.productionQuantity ?? 0}
                    onChange={handleInputChange}
                    placeholder='Enter production quantity in kg'
                />
            </div>

            {/* Extractor Power */}
            <div className='question-group'>
                <label>Extractor Power</label>
                <div className='radio-group'>
                    <label>
                        <input
                            type='radio'
                            name='extractorPower'
                            value='yes'
                            checked={extractionData.extractorPower === 'yes'}
                            onChange={handleRadioChange}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type='radio'
                            name='extractorPower'
                            value='no'
                            checked={extractionData.extractorPower === 'no'}
                            onChange={handleRadioChange}
                        />
                        No
                    </label>
                </div>
            </div>

            {/* Extractor Power Consumption - Only displayed if Extractor Power is Yes */}
            {extractionData.extractorPower === 'yes' && (
                <div className='question-group'>
                    <label>Extractor Power Consumption (kW)</label>
                    <input
                        type='number'
                        name='extractorPowerConsumption'
                        value={extractionData.extractorPowerConsumption ?? 0}
                        onChange={handleInputChange}
                        placeholder='Enter power consumption in kW'
                    />
                </div>
            )}

            {/* Monthly Carbon Emissions Display */}
            <div className='carbon-summary'>
                <h4>Monthly Carbon Emissions at this Stage</h4>
                <p>{monthlyEmissions.toFixed(2)} kg CO₂</p>
            </div>
        </section>
    )
}