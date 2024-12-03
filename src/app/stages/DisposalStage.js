'use client';

import { useEffect, useState } from 'react';

export default function DisposalStage({
    disposalData,
    setDisposalData,
    setStageCompleted,
}) {
    const [monthlyEmissions, setMonthlyEmissions] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDisposalData((prevData) => ({
            ...prevData,
            [name]: parseFloat(value),
        }));
    };

    // Handle radio button changes
    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setDisposalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Calculate emissions
    useEffect(() => {
        const {
            upcyclingStatus = 'yes',
            coffeeWasteEmissions = 0.34,
            packagingUsed = 'yes',
            packagingEmissions = 0.049,
        } = disposalData;

        let emissions = 0;

        // Calculate emissions from coffee waste only if upcycling is 'no'
        if (upcyclingStatus === 'no') {
            emissions += coffeeWasteEmissions;
        }

        // Add emissions from packaging waste if packaging is used
        if (packagingUsed === 'yes') {
            emissions += packagingEmissions;
        }

        setMonthlyEmissions(emissions);
    }, [disposalData]);

    // Check if all fields are filled out
    useEffect(() => {
        const { upcyclingStatus, coffeeWasteEmissions, packagingUsed, packagingEmissions } =
            disposalData;

        const completed =
            upcyclingStatus &&
            (upcyclingStatus === 'yes' || coffeeWasteEmissions > 0) &&
            packagingUsed &&
            (packagingUsed === 'no' || packagingEmissions > 0);

        setIsCompleted(completed);
        setStageCompleted(completed);
    }, [disposalData, setStageCompleted]);

    return (
        <section className={`stage-column ${isCompleted ? 'completed' : ''}`}>
            <h3>
                Disposal Stage {isCompleted && <span className='checkmark'>✓</span>}
            </h3>
            <article className='scroll'>
                <div className='question-container'>
                    {/* Upcycling Status */}
                    <div className='question-group'>
                        <div className='question-row'>
                            <label>Upcycling Status</label>
                            <div className='radio-group'>
                                <label>
                                    <input
                                        type='radio'
                                        name='upcyclingStatus'
                                        value='yes'
                                        checked={disposalData.upcyclingStatus === 'yes'}
                                        onChange={handleRadioChange}
                                    />
                                    Yes
                                </label>
                                <label>
                                    <input
                                        type='radio'
                                        name='upcyclingStatus'
                                        value='no'
                                        checked={disposalData.upcyclingStatus === 'no'}
                                        onChange={handleRadioChange}
                                    />
                                    No
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Coffee Grounds Waste Emissions */}
                    {disposalData.upcyclingStatus === 'no' && (
                        <div className='question-group'>
                            <label>
                                Carbon Emissions of Coffee Grounds Waste per 1kg of Coffee Beans
                            </label>
                            <div className='row-group'>
                                <input
                                    type='number'
                                    name='coffeeWasteEmissions'
                                    value={disposalData.coffeeWasteEmissions || 0.34}
                                    onChange={handleInputChange}
                                    placeholder='Enter carbon emissions for coffee grounds waste'
                                />
                                <span className='unit'>kg</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Packaging Usage */}
                <div className='question-group'>
                    <label>Use Packaging for 1kg of Coffee Beans?</label>
                    <div className='radio-group'>
                        <label>
                            <input
                                type='radio'
                                name='packagingUsed'
                                value='yes'
                                checked={disposalData.packagingUsed === 'yes'}
                                onChange={handleRadioChange}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type='radio'
                                name='packagingUsed'
                                value='no'
                                checked={disposalData.packagingUsed === 'no'}
                                onChange={handleRadioChange}
                            />
                            No
                        </label>
                    </div>
                </div>

                {/* Packaging Emissions */}
                {disposalData.packagingUsed === 'yes' && (
                    <div className='question-group'>
                        <label>Carbon Emissions from Coffee Packaging Waste</label>
                        <div className='row-group'>
                            <input
                                type='number'
                                name='packagingEmissions'
                                value={disposalData.packagingEmissions || 0.049}
                                onChange={handleInputChange}
                                placeholder='Enter carbon emissions from packaging waste'
                            />
                            <span className='unit'>kg</span>
                        </div>
                    </div>
                )}
                <div className='footnote'>
                    <p>
                        If you don't enter the carbon emissions of the waste separately, the
                        general standard of the carbon emissions will be applied.
                    </p>
                </div>
            </article>

            {/* Monthly Carbon Emissions Display */}
            <div className='carbon-summary'>
                <h4>Monthly Carbon Emissions at this Stage</h4>
                <p>{monthlyEmissions.toFixed(2)} kg CO₂</p>
            </div>
        </section>
    );
}
