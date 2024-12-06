import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '../../i18n/routing'

const LocaleSwitch = () => {
	const router = useRouter()
	const locale = useLocale()
	const t = useTranslations()

	const changeLocale = (newLocale) => {
		const { pathname, query } = router
		router.push({ pathname, query }, undefined, { locale: newLocale })
	}

	return (
		<div>
			<button
				onClick={() => changeLocale('en')}
				disabled={locale === 'en'}
				style={{ fontWeight: locale === 'en' ? 'bold' : 'normal' }}>
				{t('English')}
			</button>
			<br />
			<button
				onClick={() => changeLocale('ko')}
				disabled={locale === 'ko'}
				style={{ fontWeight: locale === 'ko' ? 'bold' : 'normal' }}>
				{t('Korean')}
			</button>
			<br />
			<Link href='/' locale={locale}>
				<button>{t('home')}</button>
			</Link>
		</div>
	)
}

export default LocaleSwitch