import {applyMiddleware, compose, createStore, Middleware, Store} from 'redux'
import {reducer, RootState} from './redux'
import {DEV} from './constants/env'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist'
import {session} from './redux/system'
import * as R from 'ramda'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    __REACT_DEVTOOLS_GLOBAL_HOOK__
    rpc: {
      lookup(name: string): Promise<any>
    }
  }
}

let store

export const getStore = (state, isServer?): Store<RootState> => {
  if (isServer && typeof window === 'undefined') {
    return createStore<RootState, any, {}, undefined>(reducer, state, applyMiddleware(thunk))
  } else {
    const composeEnhancers = DEV && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    if (!store) {
      const ws = new WebSocket('ws://localhost:5945')
      const send = new Promise(r => ws.onopen = r)
        .then(() => R.compose(ws.send.bind(ws), JSON.stringify))
      const mw: Middleware[] = [thunk.withExtraArgument({send})]


      if (!DEV) {
        if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
          window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {}
        }
      } else {
        mw.push(createLogger({
          predicate: (getState, action) => !/^@@/.test(action.type),
          collapsed: true
        }));
      }

      store = createStore<RootState, any, {}, undefined>(
        reducer,
        state,
        composeEnhancers(applyMiddleware(...mw), autoRehydrate())
      )
      store.dispatch(session());
      ws.onmessage = R.compose(store.dispatch, JSON.parse, R.prop('data'))

      const whitelist = ['persist']
      persistStore(store, {whitelist}, _ => {
        console.log(`define whitelist: ${whitelist.join(', ')}`)
      })
    }
    return store
  }
}
