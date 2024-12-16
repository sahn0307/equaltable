import createNextIntlPlugin from 'next-intl/plugin'
import path from 'path'
import sass from 'sass'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js')

const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: sass,
            sassOptions: {
              fiber: false,
            },
          },
        },
      ],
    })

    return config
  },
}

export default withNextIntl(nextConfig)
