import withTypescript from '@zeit/next-typescript'
import withCSS from '@zeit/next-css'

console.log(withTypescript, withCSS)
module =
  withCSS(
    withTypescript(
    {
    webpack(config) {
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use : {
          loader : 'url-loader',
          options: {
            limit: 100000,
            name : '[name].[ext]',
          },
        },
      })
      return config
    },
  }),
)
