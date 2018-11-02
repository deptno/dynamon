var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : {default: mod}
  }
Object.defineProperty(exports, '__esModule', {value: true})
const enzyme_adapter_react_16_1 = __importDefault(require('enzyme-adapter-react-16'))
const enzyme_1 = require('enzyme')
enzyme_1.configure({adapter: new enzyme_adapter_react_16_1.default()})
