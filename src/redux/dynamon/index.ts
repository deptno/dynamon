import {ItemList, TableDescription} from 'aws-sdk/clients/dynamodb'
import * as R from 'ramda'
import {EDynamonActionTypes as Action} from '../../../dynamon-action-types'

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case Action.SET_TABLE:
      return {...state, table: state.tables.find(t => t.TableName === action.payload)}
    case Action.READ_ENDPOINTS:
      return {...state, loadingEndpoints: true}
    case Action.READ_RECORDS:
      return {...state, records: defaultState.records}
    case Action.READ_TABLES:
      return {...state, tables: defaultState.tables}

    case Action.OK_READ_ENDPOINTS:
      return {...state, endpoints: action.payload, loadingEndpoints: false}
    case Action.OK_READ_TABLES:
      return {...state, tables: action.payload}
    case Action.OK_READ_RECORDS:
      return {...state, records: action.payload}
  }
  return state
}

export const actions = {
  setTable(tableName: string) {
    return action(Action.SET_TABLE, tableName)
  },
  readEndpoints() {
    return async (dispatch, getState, {send}) => {
      dispatch(R.tap(await send, action(Action.READ_ENDPOINTS)))
    }
  },
  readTables   : (endpoint: Endpoint['region']) => {
    return (dispatch, getState) => {
      dispatch(action(Action.READ_TABLES))
    }
  },
  readTable    : (tableName: string) => action(Action.READ_TABLE, tableName),
  createRecords: (tableName: string, records: any[]) => action(Action.CREATE_RECORDS, {tableName, records}),
  readRecords  : (tableName: string) => {
    return (dispatch, actions) => {
      dispatch(action(Action.READ_RECORDS, tableName))
    }
  },
  createRecord : (tableName: string, record: any) => action(Action.CREATE_RECORD, {tableName, record}),
  updateRecord : (tableName: string, record: any) => action(Action.UPDATE_RECORD, {tableName, record}),
  deleteRecord : (record: any) => action(Action.DELETE_RECORD, record),
}

export const defaultState: DynamonState = {
  endpoints       : [],
  tables          : [],
  records         : null,
  table           : null,
  loadingEndpoints: false,
}
/**
 * internal helper functions
 */
export function action<A extends Action>(type: A): TypedAction<A>
export function action<A extends Action, P>(type: A, payload: P): TypedActionWithPayload<A, P>
export function action<A extends Action, P>(type: A, payload?: P) {
  if (payload !== undefined) {
    return {type, payload}
  }
  return {type}
}


/**
 * types
 */
export type Actions = typeof actions
export type ActionsReturnType = ReturnType<Actions[keyof Actions]>
export interface TypedAction<A> {
  type: A
  universal: boolean
}
export interface TypedActionWithPayload<A, P> extends TypedAction<A> {
  payload: P
}
export interface Endpoint {
  name: string
  region: string
  endpoint: string
}
export interface DynamonState {
  endpoints: Endpoint[]
  tables: TableDescription[]
  table: TableDescription
  records: ItemList
  loadingEndpoints: boolean
}

