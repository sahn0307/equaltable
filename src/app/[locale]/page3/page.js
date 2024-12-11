'use client';

import { useEmissionsContext } from '../../context/EmissionsContext'; // Access the context
import LocaleSwitch from '../../components/LocaleSwitch';
import { Link } from '../../../i18n/routing'

export default function Page3() {
    const {
        productionData,
        transportData,
        processingData,
        extractionData,
        disposalData,
    } = useEmissionsContext(); // Access the context data

    // Placeholder calculations for total emissions
    const totalEmissions = 0; // Replace with actual calculation logic
    const clampedEmissions = 0; // Placeholder
    const normalizedPosition = 0; // Placeholder
    const grade = "A"; // Placeholder

    return (
        <>
            <div className="page-header">
                <div className="left">
                    <h2>Monthly Carbon Emissions Report</h2>
                    <p>
                        This page provides a detailed breakdown of your coffee's carbon emissions
                        from production to disposal. The values are based on 1 kg of raw coffee beans.
                    </p>
                </div>
                <LocaleSwitch />
            </div>

            <div className="page-content" style={{ display: 'flex', gap: '20px', alignItems: 'stretch' }}>
                {/* First Column */}
                <div className="column" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="stage-column" style={{ flex: 1 }}>
                        <h3>Monthly Coffee Usage</h3>
                        <p>{productionData?.monthlyCoffeeUsage?.toFixed(2) || 0} kg</p>
                    </div>

                    <div className="stage-column" style={{ flex: 1 }}>
                        <h3>The level of carbon emissions I use</h3>
                        <div className="gauge-container">
                            <div className="gauge">
                                <div
                                    className="gauge-pointer"
                                    style={{
                                        left: `${normalizedPosition}%`,
                                    }}
                                />
                            </div>
                            <div className="gauge-labels">
                                <span>-30</span>
                                <span>30</span>
                            </div>
                        </div>
                        
<p><Link href='/page4' className='link'>Ways to increase carbon emission reduction ratings</Link></p>
                    </div>
                </div>

                {/* Second Column */}
                <div className="column" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="stage-column" style={{ flex: 1 }}>
                        <h3>Expected Monthly Carbon Emissions</h3>
                        <p>Placeholder for data</p>
                    </div>
                </div>

                {/* Third Column */}
                <div className="column" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="stage-column" style={{ flex: 1 }}>
                        <h3>Monthly carbon emissions when using carbon-reducing coffee</h3>
                        <p>Placeholder for data</p>
                    </div>
                </div>

                {/* Fourth Column */}
                <div className="column" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="stage-column" style={{ flex: 1 }}>
                        <h3>When applying carbon-reducing coffee, how much will carbon emissions be reduced each Month?</h3>
                        <p>Placeholder for data</p>
                    </div>

                    <div className="stage-column" style={{ flex: 1 }}>
                        <h3>What is the equivalent travel distance for carbon emissions?</h3>
                        <p>Placeholder for data</p>
                    </div>

                    <div className="stage-column" style={{ flex: 1 }}>
                        <h3>What is the equivalent travel distance for carbon reduction?</h3>
                        <p>Placeholder for data</p>
                    </div>
                </div>
            </div>
        </>
    );
}
