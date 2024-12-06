import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	locales: ['ko', 'en'],
	defaultLocale: 'ko',
	pathnames: {
		'/': '/',
		'/pathnames': {
			en: '/pathnames',
			ko: '/경로명'
		}
	}
})

export const { Link, getPathname, redirect, usePathname, useRouter } =
	createNavigation(routing)