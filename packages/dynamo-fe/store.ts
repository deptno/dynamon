import {applyMiddleware, createStore} from 'redux'
import {reducer} from './redux'
import {createUniversalElectronMw} from './lib/redux-universal-electron'

declare const ipc

export const store = createStore(reducer, applyMiddleware(createUniversalElectronMw(ipc, 'action')))
