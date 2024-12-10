import { useEffect, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '../../i18n/routing'
import { useEmissionsContext } from '../context/EmissionsContext'

const LocaleSwitch = () => {
	const router = useRouter()
	const pathname = usePathname()
	const locale = useLocale()
	const t = useTranslations()
	const { saveFormState, restoreFormState } = useEmissionsContext()

	const memoizedRestoreFormState = useCallback(() => {
		restoreFormState()
	  }, [restoreFormState])
	  
	  useEffect(() => {
		memoizedRestoreFormState()
	  }, [locale, memoizedRestoreFormState]) // Restore when locale changes
	
	  const changeLocale = (newLocale) => {
		saveFormState() // Save before locale change
		const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
		router.replace(newPath, { scroll: false, shallow: true })
	  }

	return (
		<div className='switch' role='region' aria-label='language switcher'>
			<button
			className='b1'
				onClick={() => changeLocale('en')}
				disabled={locale === 'en'}
				style={{ color: locale === 'en' ? '#D16E11' : 'inherit' }}
				aria-pressed={locale === 'en'}>
				{t('English')}
			</button>
			<br />
			<button
				className='b2'
				onClick={() => changeLocale('ko')}
				disabled={locale === 'ko'}
				style={{ color: locale === 'ko' ? '#D16E11' : 'inherit' }}
				aria-pressed={locale === 'ko'}>
				{t('Korean')}
			</button>
			<br />
			<Link href='/' locale={locale}>{t('home')}</Link>
		</div>
	)
}

export default LocaleSwitch
