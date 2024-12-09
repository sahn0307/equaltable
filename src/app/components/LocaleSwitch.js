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
		<div className='switch'>
			<button
			className='b1'
				onClick={() => changeLocale('en')}
				disabled={locale === 'en'}
				style={{ color: locale === 'en' ? '#D16E11' : 'inherit' }}>
				{t('English')}
			</button>
			<br />
			<button
				className='b2'
				onClick={() => changeLocale('ko')}
				disabled={locale === 'ko'}
				style={{ color: locale === 'ko' ? '#D16E11' : 'inherit' }}>
				{t('Korean')}
			</button>
			<br />
			<Link href='/' locale={locale}>{t('home')}</Link>
		</div>
	)
}

export default LocaleSwitch
