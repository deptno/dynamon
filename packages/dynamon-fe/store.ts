import {applyMiddleware, createStore} from 'redux'
import {reducer} from './redux'
import {createUniversalElectronMw} from '../redux-universal-electron'

declare const ipc

export const store = (window as any).ipc
  ? createStore(reducer, applyMiddleware(createUniversalElectronMw(ipc, 'action')))
  : createStore(reducer)
