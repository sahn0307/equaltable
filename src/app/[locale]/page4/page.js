'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '../../../i18n/routing'
import LocaleSwitch from '../../components/LocaleSwitch'
import chevron from '../../../../public/assets/chevron.png'
import step1 from '../../../../public/assets/step1.png'
import step2 from '../../../../public/assets/step2.png'
import step3 from '../../../../public/assets/step3.png'
import step4 from '../../../../public/assets/step4.png'
import step5 from '../../../../public/assets/step5.png'

export default function Page() {
	const t = useTranslations()

	return (
		<section className='page-wrapper'>
			<div className='page-header'>
				<div className='left'>
					<h2>{t('p2-header')}</h2>
					<p>{t('p2-para1')}</p>
					<p>{t('p2-para2')}</p>
				</div>
				<LocaleSwitch />
			</div>
			<div className='row'>
				<div className='col'>
					<Image
						src={step1}
						width={38.6}
						height={60.4}
						alt='Production Stage Icon'
					/>
					<span className='stage-title medium'>{t('stg-2')}</span>
					<div className='bar-circle' />
				</div>
				<Image src={chevron} width={16} height={16} alt='chevron' />
				<div className='col'>
					<Image
						src={step2}
						width={63.8}
						height={39.2}
						alt='Transportation Stage Icon'
					/>
					<span className='stage-title medium'>{t('stg-3')}</span>
					<div className='bar-circle' />
				</div>
				<Image src={chevron} width={16} height={16} alt='chevron' />
				<div className='col'>
					<Image
						src={step3}
						width={30.2}
						height={80.5}
						alt='Processing Stage Icon'
					/>
					<span className='stage-title medium'>{t('stg-4')}</span>
					<div className='bar-circle' />
				</div>
				<Image src={chevron} width={16} height={16} alt='chevron' />
				<div className='col'>
					<Image
						src={step4}
						width={46.7}
						height={51.2}
						alt='Extraction Stage Icon'
					/>
					<span className='stage-title medium'>{t('stg-5')}</span>
					<div className='bar-circle' />
				</div>
				<Image src={chevron} width={16} height={16} alt='chevron' />
				<div className='col'>
					<Image
						src={step5}
						width={41.3}
						height={47.5}
						alt='Disposal Stage Icon'
					/>
					<span className='stage-title medium'>{t('stg-6')}</span>
					<div className='bar-circle' />
				</div>
			</div>
			<div className='psudo-progress'>
				<div className='bar'>
					<div className='bar-line' />
				</div>
			</div>

			<div className='card-row row'>
				<div className='card h180'>
					<p>{t('prod-info')}</p>
				</div>
				<div className='card h180'>
					<p>{t('trans-info')}</p>
				</div>
				<div className='card h180'>
					<p>{t('process-info')}</p>
				</div>
				<div className='card h180'>
					<p>{t('ext-info')}</p>
				</div>
				<div className='card h180'>
					<p>{t('dis-info')}</p>
				</div>
			</div>
			<div className='card-div'>{t('row-2')}</div>
			<div className='card-row row'>
				<div className='card h150'>
					<p className='card-title'>
						{t.rich('prod-cc', {
							accent: (chunks) => <span>{chunks}</span>,
							br: () => <br />
						})}
					</p>
					<p>{t('prod-p')}</p>
				</div>
				<div className='card h150'>
					<p className='card-title'>
						{t.rich('trans-cc', {
							accent: (chunks) => <span>{chunks}</span>,
							br: () => <br />
						})}
					</p>
					<p>{t('trans-cc-p')}</p>
				</div>
				<div className='card h150'>
					<p className='card-title'>
						{t.rich('process-cc', {
							accent: (chunks) => <span>{chunks}</span>,
							br: () => <br />
						})}
					</p>
					<p>{t('process-cc-p')}</p>
				</div>
				<div className='card h150'>
					<p className='card-title'>
						{t.rich('ext-cc', {
							accent: (chunks) => <span>{chunks}</span>,
							br: () => <br />
						})}
					</p>
					<p>{t('ext-cc-p')}</p>
				</div>
				<div className='card h150'>
					<p className='card-title'>
						{t.rich('dis-cc', {
							accent: (chunks) => <span>{chunks}</span>,
							br: () => <br />
						})}
					</p>
					<p>{t('dis-cc-p')}</p>
				</div>
			</div>
			<div className='card-div'>{t('row-3')}</div>
			<div className='card-row row'>
				<div className='card h150'>
					<p className='card-title'>
						{t.rich('prod-ind', {
							accent: (chunks) => <span>{chunks}</span>,
							br: () => <br />
						})}
					</p>
					<p>{t('prod-ind-p')}</p>
				</div>
				<div className='card h150'>
					<p className='card-title'>
						{t.rich('trans-ind', {
							accent: (chunks) => <span>{chunks}</span>,
							br: () => <br />
						})}
					</p>
					<p>{t('trans-ind-p')}</p>
				</div>
				<div className='card h150'>
					<p className='card-title'>
						{t.rich('process-ind', {
							accent: (chunks) => <span>{chunks}</span>,
							br: () => <br />
						})}
					</p>
					<p>{t('process-ind-p')}</p>
				</div>
				<div className='card h150'>
					<p className='card-title'>
						{t.rich('ext-ind', {
							accent: (chunks) => <span>{chunks}</span>,
							br: () => <br />
						})}
					</p>
					<p>{t('ext-ind-p')}</p>
				</div>
				<div className='card h150'>
					<p className='card-title'>
						{t.rich('dis-ind', {
							accent: (chunks) => <span>{chunks}</span>,
							br: () => <br />
						})}
					</p>
					<p>{t('dis-ind-p')}</p>
				</div>
			</div>
		</section>
	)
}
