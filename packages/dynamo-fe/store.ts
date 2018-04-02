import {createStore} from 'redux'
import {reducer} from './redux'

export const store = createStore(reducer)