import { useRouter, usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '../../i18n/routing'

const LocaleSwitch = () => {
	const router = useRouter()
	const pathname = usePathname()
	const locale = useLocale()
	const t = useTranslations()

	const changeLocale = (newLocale) => {
		// Convert current path to new locale path
		const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
		router.push(newPath)
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
