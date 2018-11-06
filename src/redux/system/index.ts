import {REHYDRATE} from 'redux-persist/constants'
import {Reducer} from 'redux'

const defaultState = {} as SystemState

export const reducer: Reducer<SystemState> = (state = defaultState, action) => {
  const {type, payload} = action
  switch (type) {
    case ActionTypes.BOOT:
      return {
        ...state,
        boot: true,
      }
    case REHYDRATE:
      return {
        ...state,
        reHydrated: true,
      }
    default:
      return state
  }
}

enum ActionTypes {
  BOOT    = 'boot',
}

export function boot() {
  return {
    type: ActionTypes.BOOT,
  }
}

export function session() {
  return async (dispatch, getState, {ws}) => {
    dispatch(boot())
  }
}

export interface SystemState {
  boot: boolean
  reHydrated: boolean
}

