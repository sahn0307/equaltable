import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js')

const nextConfig = {
  sassOptions: {
    includePaths: ['./src/app/styles'],
    logger: {
      warn: function(message) {
        // Suppress deprecation warnings
        if (!message.includes('deprecat')) {
          console.warn(message);
        }
      }
    }
  }
}

export default withNextIntl(nextConfig)