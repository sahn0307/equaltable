'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '../../i18n/routing';
import { useEmissionsContext } from '../context/EmissionsContext';
import LocaleSwitch from '../components/LocaleSwitch';
import simple from '../../../public/assets/easy-check.png';
import detail from '../../../public/assets/detailed.png';

export default function Page1() {
  const t = useTranslations();
  const { productionData, setProductionData, setSimpleAnalysisDefaults } = useEmissionsContext();
  const [dataConsent, setDataConsent] = useState(false);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setProductionData((prev) => ({
      ...prev,
      monthlyCoffeeUsage: parseFloat(value) || 0,
    }));
  };

  const handleConsentChange = (e) => setDataConsent(e.target.checked);
  const usageValid = productionData.monthlyCoffeeUsage > 0;
  const canProceed = usageValid && dataConsent;
  const linkButtonClass = `p1-button ${!canProceed ? 'disabled' : ''}`;

  const getAriaLabel = () => {
    if (!productionData.monthlyCoffeeUsage) {
      return t('aria-needs-usage');
    }
    if (!dataConsent) {
      return t('aria-needs-consent');
    }
    return '';
  };

  const handleSimpleAnalysis = (e) => {
    if (!canProceed) {
      e.preventDefault();
      return;
    }
    setSimpleAnalysisDefaults();
  };

  return (
    <section className="centered-wrapper">
      <div className="flex-row">
        <LocaleSwitch />
      </div>
      <div className="page1-header">
        <h1>{t('p1-header')}</h1>
        <p>{t('p1-desc')}</p>
      </div>

      <form className="step1">
        <div className="question-group">
          <div className="row-group">
            <input
              type="number"
              name="monthlyCoffeeUsage"
              placeholder={t('input-default-kg')}
              value={productionData.monthlyCoffeeUsage || ''}
              onChange={handleInputChange}
              required
            />
            <span className="unit">kg</span>
          </div>
        </div>
        <div className="button-group">
          {/* Simple Analysis Button */}
          <Link
            href={canProceed ? '/page3' : '#'}
            onClick={handleSimpleAnalysis}
            className={!canProceed ? 'disabled-link' : ''}
            aria-disabled={!canProceed}
            aria-label={!canProceed ? getAriaLabel() : undefined}
          >
            <button type="button" className={linkButtonClass} disabled={!canProceed}>
              <Image
                className="b1"
                src={simple}
                width={45}
                height={62}
                alt="document icon"
                priority
              />
              <div className="bottom">
                <div className="title-group">
                  {t.rich('easy-check-title', {
                    accent: (chunks) => <p className="title accent bold">{chunks}</p>,
                    bold: (chunks) => <p className="title bold">{chunks}</p>,
                    row: (chunks) => <div className="row">{chunks}</div>,
                  })}
                </div>
                <p className="small">{t('button-2-desc')}</p>
              </div>
            </button>
          </Link>

          {/* Detailed Emissions Button */}
          <Link
            href={canProceed ? '/page2' : '#'}
            onClick={(e) => !canProceed && e.preventDefault()}
            className={!canProceed ? 'disabled-link' : ''}
            aria-disabled={!canProceed}
            aria-label={!canProceed ? getAriaLabel() : undefined}
          >
            <button type="button" className={linkButtonClass} disabled={!canProceed}>
              <Image
                className="b2"
                src={detail}
                width={76}
                height={68}
                alt="pencil checking icon"
                priority
              />
              <div className="bottom">
                <div className="title-group">
                  {t.rich('detail-check-title', {
                    accent: (chunks) => <div className="title accent bold">{chunks}</div>,
                    bold: (chunks) => <div className="title bold">{chunks}</div>,
                    row: (chunks) => <div className="row">{chunks}</div>,
                  })}
                </div>
                <p className="small">{t('button-2-desc')}</p>
              </div>
            </button>
          </Link>
        </div>
      </form>

      <div className="data-consent">
        <div className="row">
          <p className="medium title">{t('data-consent-title')}</p>
          <div className="row">
            <input type="checkbox" checked={dataConsent} onChange={handleConsentChange} />
            <label>{t('data-consent')}</label>
          </div>
        </div>
        <p className="small">{t('data-consent-desc')}</p>
      </div>
    </section>
  );
}
