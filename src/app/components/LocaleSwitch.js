import { useRouter, usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '../../i18n/routing'
import { useEmissionsContext } from '../context/EmissionsContext'
import { useEffect, useCallback } from 'react'

const LocaleSwitch = () => {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations()
  const { saveFormState, restoreFormState } = useEmissionsContext()

  const memoizedRestore = useCallback(() => {
    restoreFormState()
  }, [restoreFormState])

  useEffect(() => {
    memoizedRestore()
  }, [locale, memoizedRestore])

  const changeLocale = async (newLocale) => {
    try {
      await saveFormState()
      const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
      await router.replace(newPath, { 
        scroll: false, 
        shallow: true,
        skipRscFetch: true 
      })
    } catch (error) {
      console.debug('Locale transition:', error)
    }
  }

  return (
    <div className='switch' role='region' aria-label='language switcher'>
      <button
        className='b1'
        onClick={() => changeLocale('en')}
        disabled={locale === 'en'}
        style={{ color: locale === 'en' ? '#D16E11' : 'inherit' }}>
        {t('English')}
      </button>
      <button
        className='b2'
        onClick={() => changeLocale('ko')}
        disabled={locale === 'ko'}
        style={{ color: locale === 'ko' ? '#D16E11' : 'inherit' }}>
        {t('Korean')}
      </button>
      <Link href='/' locale={locale}>{t('reset')}</Link>
    </div>
  )
}

export default LocaleSwitch