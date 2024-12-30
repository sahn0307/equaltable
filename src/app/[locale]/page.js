'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '../../i18n/routing'
import { useEmissionsContext } from '../context/EmissionsContext'
import LocaleSwitch from '../components/LocaleSwitch'
import logo from '../../../public/assets/logo.png'
import simple from '../../../public/assets/easy-check.png'
import detail from '../../../public/assets/detailed.png'

export default function Page1() {
	const t = useTranslations()
	const { productionData, setProductionData } = useEmissionsContext()
	// Handle input change to save monthly coffee usage to context
	const handleInputChange = (e) => {
		const { value } = e.target
		setProductionData((prev) => ({
			...prev,
			monthlyCoffeeUsage: parseFloat(value) || 0
		}))
	}

	return (
		<section className='centered-wrapper'>
			<div className='flex-row'>
				<LocaleSwitch />
			</div>
			<div className='page1-header'>
				<h1>{t('p1-header')}</h1>
				<p>{t('p1-desc')}</p>
			</div>
			<form className='step1'>
				{/* Monthly Coffee Usage */}
				<div className='question-group'>
					<div className='row-group'>
						<input
							type='number'
							name='monthlyCoffeeUsage'
							placeholder={t('input-default-kg')}
							value={productionData.monthlyCoffeeUsage || ''} // Controlled input
							onChange={handleInputChange} // Update context
						/>
						<span className='unit'>kg</span>
					</div>
				</div>
				<div className='button-group'>
					{/* Simple Check Button */}
					<Link href='/page3' passHref>
						<button type='button' className='p1-button'>
							<Image
								className='b1'
								src={simple}
								width={45}
								height={62}
								alt='document icon'
								priority={true}
							/>
							<div className='bottom'>
								<div className='title-group'>
									{t.rich('easy-check-title', {
										accent: (chunks) => (
											<p className='title accent bold'>
												{chunks}
											</p>
										),
										bold: (chunks) => (
											<p className='title bold'>
												{chunks}
											</p>
										),
										row: (chunks) => (
											<div className='row'>{chunks}</div>
										)
									})}
								</div>
								<p className='small'>{t('button-2-desc')}</p>
							</div>
						</button>
					</Link>
					{/* Detailed Check Button */}
					<Link href='/page2' passHref>
						<button type='button' className='p1-button'>
							<Image
								className='b2'
								src={detail}
								width={76}
								height={68}
								alt='pencil checking icon'
								priority={true}
							/>
							<div className='bottom'>
								<div className='title-group'>
									{t.rich('detail-check-title', {
										accent: (chunks) => (
											<div className='title accent bold'>
												{chunks}
											</div>
										),
										bold: (chunks) => (
											<div className='title bold'>
												{chunks}
											</div>
										),
										row: (chunks) => (
											<div className='row'>{chunks}</div>
										)
									})}
								</div>
								<p className='small'>{t('button-2-desc')}</p>
							</div>
						</button>
					</Link>
				</div>
			</form>
			<div className='data-consent'>
				<div className='row'>
					<p className='medium title'>{t('data-consent-title')}</p>
					<div className='row'>
						<input type='checkbox' />
						<label>{t('data-consent')}</label>
					</div>
				</div>
				<p className='small'>{t('data-consent-desc')}</p>
			</div>
		</section>
	)
}
