// 'use client'
import { useCallback } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { routing } from '../../i18n/routing'
import { Roboto } from 'next/font/google'
import localFont from 'next/font/local'
import { EmissionsProvider } from '../context/EmissionsContext'
import '../styles/global.scss'

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'],
	display: 'swap'
})

const pretendard = localFont({
	// Default for Korean
	src: '../fonts/PretendardVariable.woff2',
	display: 'swap',
	weight: '400 800'
})

async function fetchMessages(locale) {
	try {
		const messages = await import(`../../messages/${locale}.json`)
		return messages.default
	} catch (error) {
		console.error(`Failed to load messages for locale ${locale}:`, error)
		return {} // Fallback to empty messages
	}
}

export async function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }) {
	const { locale } = await params

	// Ensure that the incoming locale is valid, else default to Korean
	let currentLocale = locale
	if (!routing.locales.includes(currentLocale)) {
		currentLocale = 'ko'
	}

	const messages = await fetchMessages(currentLocale)

	return (
		<NextIntlClientProvider messages={messages} locale={currentLocale}>
			<html lang={currentLocale}>
				<head>
					<title>Carbon Emissions Calculator</title>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</head>
				<body className={`${roboto.className} ${pretendard.className}`}>
					<EmissionsProvider>
						<main>{children}</main>
					</EmissionsProvider>
				</body>
			</html>
		</NextIntlClientProvider>
	)
}
