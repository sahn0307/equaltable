'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '../../../i18n/routing'
import { useEmissionsContext } from '../../context/EmissionsContext'
import LocaleSwitch from '../../components/LocaleSwitch'
import EmissionsBreakdown from '../../components/EmissionsBreakdown'
import CarbonReducingEmissions from '../../components/CarbonReducingEmissions'
import TravelDistanceEquivalent from '../../components/TravelDistanceEquivalent'
import PineTreeEquivalent from '../../components/PineTreeEquivalent'
import ExpectedMonthlyEmissions from '../../components/ExpectedMonthlyEmissions'
import EmissionsGauge from '../../components/EmissionsGauge'

// Example images
import chevron from '../../../../public/assets/chevron-accent.png'
import minus from '../../../../public/assets/minus.png'
import car from '../../../../public/assets/car.png'
import trees from '../../../../public/assets/trees.png'

export default function Page3() {
  const t = useTranslations()

  // Actual user data from context
  const {
    productionData,
    transportData,
    processingData,
    extractionData,
    disposalData
  } = useEmissionsContext()

  return (
    <section className='page3-wrapper'>
      <div className='page-header'>
        <div className='left'>
          <h2>{t('p3-header')}</h2>
          <p>{t('p3-p')}</p>
        </div>
        <LocaleSwitch />
      </div>

      <div className='content-wrapper'>
        {/* -- COL 1 -- */}
        <article>
          <div className='card-row-wrapper'>
            <div className='card square'>
              <h5>{t('col1-1-1-h')}</h5>
              <p>
                {Number(productionData?.monthlyCoffeeUsage || 0).toFixed(2)} kg
              </p>
            </div>
            <div className='card square'>
              <h5>{t('col1-2-h')}</h5>
              <p>
                <ExpectedMonthlyEmissions
                  productionData={productionData}
                  transportData={transportData}
                  processingData={processingData}
                  extractionData={extractionData}
                  disposalData={disposalData}
                />
              </p>
            </div>
          </div>
          <EmissionsGauge
            productionData={productionData}
            transportData={transportData}
            processingData={processingData}
            extractionData={extractionData}
            disposalData={disposalData}
            chevronImage={chevron}
          />
        </article>

          {/* COL 2 */}
        <article className='card'>
          <div className='graph-content'>
            <h5>{t.rich('col2-h', { br: () => <br /> })}</h5>
            <EmissionsBreakdown
              productionData={productionData}
              transportData={transportData}
              processingData={processingData}
              extractionData={extractionData}
              disposalData={disposalData}
            />
          </div>
          <div className='footnote-wrapper'>
            <p className='col-footnotes'>{t.rich('col2-info', { br: () => <br /> })}</p>
          </div>
        </article>

        {/* COL 3 */}
        <article className='card'>
          <div className='graph-content'>
            <h5>{t.rich('col3-h', { br: () => <br /> })}</h5>
            <EmissionsBreakdown
              overrideStageValues={{
                productionPerKg: -3.60,
                transportPerKg: 0.41,
                processingPerKg: 0.83,
                extractionPerKg: 0.74,
                disposalPerKg: 0.34
              }}
            />
          </div>
          <div className='footnote-wrapper'>
            <p className='col-footnotes'>{t.rich('col3-info', { br: () => <br /> })}</p>
          </div>
        </article>

        {/* -- COL 4 -- */}
        <article>
          <div className='card p4-accent h180'>
            <h5>
              {t.rich('col4-1', {
                br: () => <br />
              })}
            </h5>
            <div className='col4-1'>
              <CarbonReducingEmissions
                productionData={productionData}
                transportData={transportData}
                processingData={processingData}
                extractionData={extractionData}
                disposalData={disposalData}
              />
              <Image
                src={minus}
                width={90}
                height={90}
                alt='minus icon'
                priority={true}
                className='four1'
              />
            </div>
          </div>
          <div className='font-20'>
            {t.rich('col4-2', {
              br: () => <br />
            })}
          </div>
          <div className='card h180'>
            <h5>
              {t.rich('col4-3', {
                br: () => <br />
              })}
            </h5>
            <div className='row-wrapper col4-3'>
              <TravelDistanceEquivalent
                productionData={productionData}
                transportData={transportData}
                processingData={processingData}
                extractionData={extractionData}
                disposalData={disposalData}
              />
              <Image
                src={car}
                width={132.6}
                height={61.8}
                alt='car icon'
                priority={true}
                className='four3'
              />
            </div>
          </div>
          <div className='font-12'>
            {t.rich('col4-4', {
              br: () => <br />
            })}
          </div>
          <div className='card h180'>
            <h5>
              {t.rich('col4-5', {
                br: () => <br />
              })}
            </h5>
            <div className='row-wrapper col4-5'>
              <p>
                <PineTreeEquivalent
                  productionData={productionData}
                  transportData={transportData}
                  processingData={processingData}
                  extractionData={extractionData}
                  disposalData={disposalData}
                />{' '}
                {t('trees')}
              </p>
              <Image
                src={trees}
                width={94.8}
                height={109}
                alt='icon of trees'
                priority={true}
                className='four5'
              />
            </div>
          </div>
          <div className='font-12'>
            {t.rich('col4-6', {
              br: () => <br />
            })}
          </div>
        </article>
      </div>
    </section>
  )
}
