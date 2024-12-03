// src/app/components/ProgressBar.js
import React from 'react'

function ProgressBar({ stagesCompleted }) {
    const stages = [
        'Monthly usage entry completed',
        'Production Stage',
        'Transportation Stage',
        'Processing Stage',
        'Extraction Stage',
        'Disposal Stage',
        'Check results'
    ]

    return (
        <div className='progress-bar'>
            {stages.map((stage, index) => (
                <div key={index} className='progress-step'>
                    <div
                        className={`circle ${
                            stagesCompleted[index] ? 'completed' : ''
                        }`}
                    >
                        {index + 1}
                    </div>
                    <div
                        className={`label ${
                            stagesCompleted[index] ? 'completed' : ''
                        }`}
                    >
                        {stage}
                    </div>
                    {index < stages.length - 1 && (
                        <div
                            className={`line ${
                                stagesCompleted[index] ? 'completed' : ''
                            }`}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default ProgressBar