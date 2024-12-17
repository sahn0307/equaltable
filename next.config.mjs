import createNextIntlPlugin from 'next-intl/plugin'
import * as sass from 'sass'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js')

const nextConfig = {
  sassOptions: {
    implementation: sass,
    includePaths: ['./src/app/styles'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
              localIdentName: '[local]--[hash:base64:5]',
            },
          },
        },
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