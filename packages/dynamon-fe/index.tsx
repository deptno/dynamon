import * as React from 'react'
import {render} from 'react-dom'
import {Home} from './components/Home'
import {Provider} from 'react-redux'
import {store} from './store'
import 'regenerator-runtime/runtime'

render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.querySelector('#app'),
)
