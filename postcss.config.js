var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : {default: mod}
  }
const postcss_preset_env_1 = __importDefault(require('postcss-preset-env'))
module.exports = {
  plugins: [postcss_preset_env_1.default()],
}
