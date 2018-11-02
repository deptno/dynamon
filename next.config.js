var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : {default: mod}
  }
Object.defineProperty(exports, '__esModule', {value: true})
const next_typescript_1 = __importDefault(require('@zeit/next-typescript'))
const next_css_1 = __importDefault(require('@zeit/next-css'))
module = next_typescript_1.default(
  next_css_1.default({
    webpack(config) {
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
