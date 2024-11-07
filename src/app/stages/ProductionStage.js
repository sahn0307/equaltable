// src/app/stages/ProductionStage.js
'use client'
import { useEffect, useState } from 'react'

export default function ProductionStage({ productionData, setProductionData }) {
    // Local state for monthly emissions at this stage
    const [monthlyEmissions, setMonthlyEmissions] = useState(0)

    // Set default value for carbonEmissionsPerKg if not provided
    useEffect(() => {
        if (productionData.carbonEmissionsPerKg === undefined) {
            setProductionData((prevData) => ({
                ...prevData,
                carbonEmissionsPerKg: 1.64
            }))
        }
    }, [productionData, setProductionData])

    // Handle input changes for production stage
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProductionData((prevData) => ({
            ...prevData,
            [name]: parseFloat(value)
        }))
    }

    // Calculate monthly emissions whenever productionData changes
    useEffect(() => {
        const { monthlyCoffeeUsage, carbonEmissionsPerKg } = productionData

        // Calculate emissions only if values are positive numbers
        if (monthlyCoffeeUsage > 0 && carbonEmissionsPerKg > 0) {
            setMonthlyEmissions(monthlyCoffeeUsage * carbonEmissionsPerKg)
        } else {
            setMonthlyEmissions(0)
        }
    }, [productionData])

    return (
        <section className='stage-column'>
            <h3>Production Stage</h3>
            {/* Monthly Coffee Usage */}
            <div className='question-group'>
                <label>Monthly Coffee Usage (kg)</label>
                <div className='row-group'>
                    <input
                        type='number'
                        name='monthlyCoffeeUsage'
                        value={productionData.monthlyCoffeeUsage || ''}
                        onChange={handleInputChange}
                        placeholder='Enter monthly coffee usage in kg'
                    />
                    <span className='unit'>kg</span>
                </div>
            </div>
            {/* Carbon Emissions from Farm */}
            <div className='question-group'>
                <label>
                    Carbon Emissions from Farm (kg CO₂ per kg of roasted beans)
                </label>
                <input
                    type='number'
                    name='carbonEmissionsPerKg'
                    value={productionData.carbonEmissionsPerKg || 1.64}
                    onChange={handleInputChange}
                    placeholder='Enter emissions per kg of roasted beans'
                />
            </div>
            {/* Monthly Carbon Emissions Display */}
            <div className='carbon-summary'>
                <h4>Monthly Carbon Emissions at this Stage</h4>
                <p>{monthlyEmissions.toFixed(2)} kg CO₂</p>
            </div>
        </section>
    )
}