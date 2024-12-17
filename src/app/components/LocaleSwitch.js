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

  const changeLocale = async (newLocale) => {
    try {
      await saveFormState()
      const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
      await router.replace(newPath, { 
        scroll: false, 
        shallow: true 
      })
      await restoreFormState()
    } catch (error) {
      console.error('Locale switch error:', error)
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
      <Link href='/' locale={locale}>{t('home')}</Link>
    </div>
  )
}

export default LocaleSwitch