// src/app/components/ProgressBar.js
import { useTranslations } from 'next-intl'

function ProgressBar({ stagesCompleted }) {
    const t = useTranslations()

    const stages = [
        t('stg-1'),
        t('stg-2'),
        t('stg-3'),
        t('stg-4'),
        t('stg-5'),
        t('stg-6')
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