import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Remove the i18n property to avoid conflicts
    // we are using: app routing and sub-path routing
}

export default withNextIntl(nextConfig)