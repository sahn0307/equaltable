import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ProductionStage({
    productionData,
    setProductionData,
    setStageCompleted
}) {
    const [isCompleted, setIsCompleted] = useState(true)
    const t = useTranslations()

    const DEFAULT_EMISSIONS = 1.64

    // Set default value for carbonEmissionsPerKg immediately
    useEffect(() => {
        if (!productionData.carbonEmissionsPerKg) {
            setProductionData((prevData) => ({
                ...prevData,
                carbonEmissionsPerKg: DEFAULT_EMISSIONS
            }))
        }
    }, [productionData.carbonEmissionsPerKg, setProductionData])

    // Handle input changes for production stage
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProductionData((prevData) => ({
            ...prevData,
            [name]: parseFloat(value)
        }))
    }

    // Check if field is filled out
    useEffect(() => {
        const { carbonEmissionsPerKg } = productionData
        const completed = carbonEmissionsPerKg > 0
        setIsCompleted(completed)
        setStageCompleted(completed)
    }, [productionData, setStageCompleted])

    return (
        <section className={`stage-column ${isCompleted ? 'completed' : ''}`}>
            {t.rich('stg-2-col', {
                h3: (chunks) => {
                    const className = isCompleted ? 'completed' : ''
                    return <h3 className={className}>{chunks}</h3>
                }
            })}
            <article className='scroll'>
                {/* Carbon Emissions from Farm */}
                <div className='question-group'>
                    <label>{t('q2')}</label>
                    <div className='row-group'>
                        <input
                            type='number'
                            name='carbonEmissionsPerKg'
                            placeholder={t('input-default')}
                            value={productionData.carbonEmissionsPerKg ?? DEFAULT_EMISSIONS}
                            onChange={handleInputChange}
                        />
                        <span className='unit'>kg</span>
                    </div>
                </div>
                <div className='footnote'>
                    <p>{t('f-1')}</p>
                    <br />
                    <br />
                    <br />
                    <span className='bold'>{t('ref')}</span>
                    <p>{t('ref-1')}</p>
                    <br />
                    <p>{t('ref-2')}</p>
                </div>
            </article>

            {/* Per kg Carbon Emissions Display */}
            <div className='carbon-summary'>
                <h4>{t('carbon-summary-title')}</h4>
                <p>{(productionData.carbonEmissionsPerKg ?? DEFAULT_EMISSIONS).toFixed(2)} kg CO₂</p>
            </div>
        </section>
    )
}