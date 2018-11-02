const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

module.exports = withTypescript(
  withCSS({
    webpack(config) {
      if (process.env.ANALYZE) {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
            openAnalyzer: true,
          }),
        )
      }
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]',
          },
        },
      })
      return config
    },
  }),
)
