import {
  ActionsReturnType,
  ActionTypes,
  Endpoint,
  ResponseActionsReturnType,
} from 'dynamon-redux-actions'
import {ItemList, TableDescription} from 'aws-sdk/clients/dynamodb'

const defaultState: RootState = Object.freeze({
  endpoints       : [],
  tables          : [],
  records         : null,
  table           : null,
  loadingEndpoints: false,
})
export const reducer = (state = defaultState, action) => {
  if (action.type.startsWith('@')) {
    return state
  }
  if ('response' in action) {
    const nextState = responseReducer(state, action)
    if (state !== nextState) {
      return nextState
    }
  }
  return actionReducer(state, action)

}
export const actionReducer = (state = defaultState, action: ActionsReturnType) => {
  switch (action.type) {
    case ActionTypes.SET_TABLE:
      return {...state, table: state.tables.find(t => t.TableName === action.payload)}
    case ActionTypes.READ_ENDPOINTS:
      return {...state, loadingEndpoints: true}
    case ActionTypes.READ_RECORDS:
      return {...state, records: defaultState.records}
    case ActionTypes.READ_TABLES:
      return {...state, tables: defaultState.tables}
  }
  return state
}
export const responseReducer = (state = defaultState, action: ResponseActionsReturnType) => {
  switch (action.type) {
    case ActionTypes.READ_ENDPOINTS:
      return {...state, endpoints: action.payload, loadingEndpoints: false}
    case ActionTypes.READ_TABLES:
      return {...state, tables: action.payload}
    case ActionTypes.READ_RECORDS:
      return {...state, records: action.payload}
  }

  return state
}


export interface RootState {
  endpoints: Endpoint[]
  tables: TableDescription[]
  table: TableDescription
  records: ItemList
  loadingEndpoints: boolean
}
