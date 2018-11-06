import {combineReducers} from 'redux'
import {reducer as persist, PersistState} from './persist'
import {reducer as system, SystemState} from './system'
import {reducer as dynamon, DynamonState} from './dynamon'

export const reducer = combineReducers<RootState>({
  persist,
  system,
  dynamon
})

export interface RootState {
  persist: PersistState,
  system: SystemState,
  dynamon: DynamonState
}
