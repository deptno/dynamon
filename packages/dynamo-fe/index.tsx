import * as React from 'react'
import {render} from 'react-dom'
import {Home} from './components/Home'
import {Provider} from 'react-redux'
import {store} from './store'

render(
  (
    <Provider store={store}>
      <Home/>
    </Provider>
  ),
  document.querySelector('#app')
)

declare const ipc

ipc.on('channel', (_, action) => {
  store.dispatch(action)
  console.log('store', store.getState())
})
ipc.send('channel', 'ping')
