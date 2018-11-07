import {ItemList, TableDescription} from 'aws-sdk/clients/dynamodb'
import * as R from 'ramda'
import {EDynamonActionTypes as Action} from '../../../dynamon-action-types'

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case Action.SET_TABLE: {
      const table = state.tables.find(t => t.TableName === action.payload)
      return {
        ...state,
        table,
        selectedTable: table
          ? table.TableName
          : defaultState.selectedTable,
      }
    }
    case Action.READ_ENDPOINTS:
      return {...state, loadingEndpoints: true}
    case Action.READ_RECORDS:
      return {...state, records: defaultState.records}
    case Action.READ_TABLES:
      return {...state, tables: defaultState.tables, endpoint: action.payload.endpoint}

    case Action.OK_READ_ENDPOINTS:
      return {...state, endpoints: action.payload, loadingEndpoints: false}
    case Action.ADD_ENDPOINT:
      return {...state, endpoints: [action.payload].concat(state.endpoints)}
    case Action.OK_READ_TABLES:
      return {...state, tables: action.payload}
    case Action.OK_READ_RECORDS:
      return {...state, records: action.payload.Items || [], lastEvaluateKey: action.payload.LastEvaluatedKey}
    case Action.DELETE_TABLE:
      return {...state}
  }
  return state
}

export const actions = {
  scan(conditions) {
    return async (dispatch, getState, {send}) => {
      const {endpoint, table} = getState().dynamon
      console.log(action(Action.SCAN, {endpoint, table, conditions}))
      await dispatch(R.tap(await send, action(Action.SCAN, {endpoint, table, conditions})))
    }
  },
  query(conditions) {
    return async (dispatch, getState, {send}) => {
      const {endpoint, table} = getState().dynamon
      debugger
      await dispatch(R.tap(await send, action(Action.QUERY, {endpoint, table, conditions})))
    }
  },
  setTable(tableName: string) {
    return action(Action.SET_TABLE, tableName)
  },
  createTable(table) {
    return async (dispatch, getState, {send}) => {
      const endpoint = getState().dynamon.endpoint
      await dispatch(R.tap(await send, action(Action.CREATE_TABLE, {endpoint, table})))
      await dispatch(await this.readTables(endpoint))
    }
  },
  deleteTable(table) {
    return async (dispatch, getState, {send}) => {
      const endpoint = getState().dynamon.endpoint
      await dispatch(R.tap(await send, action(Action.DELETE_TABLE, {endpoint, table})))
    }
  },
  readEndpoints() {
    return async (dispatch, getState, {send}) => {
      return dispatch(R.tap(await send, action(Action.READ_ENDPOINTS)))
    }
  },
  readTables(endpoint) {
    return async (dispatch, getState, {send}) => {
      return dispatch(R.tap(await send, action(Action.READ_TABLES, {endpoint})))
    }
  },
  readTable(tableName: string) {
    return (dispatch, getState) => {
      dispatch(action(Action.READ_TABLE, {
        endpoint: getState().dynamon.endpoint,
        tableName,
      }))
    }
  },
  /**
   * @todo endpoint, table, records
   */
  createRecord(tableName: string, record: any) {
    return async (dispatch, getState, {send}) => {
      const endpoint = getState().dynamon.endpoint
      return dispatch(R.tap(await send, action(Action.CREATE_RECORD, {endpoint, tableName, record})))
    }
  },
  /**
   * @todo endpoint, table, records
   */
  createRecords(tableName: string, records: any[]) {
    return async (dispatch, getState, {send}) => {
      const endpoint = getState().dynamon.endpoint
      return dispatch(R.tap(await send, action(Action.CREATE_RECORDS, {tableName, records})))
    }
  },
  readRecords : (tableName: string) => {
    return async (dispatch, getState, {send}) => {
      dispatch(R.tap(await send, action(Action.READ_RECORDS, {
        endpoint: getState().dynamon.endpoint,
        tableName,
      })))
    }
  },
  updateRecord: (tableName: string, record: any) => action(Action.UPDATE_RECORD, {tableName, record}),
  deleteRecord: (record: any) => action(Action.DELETE_RECORD, record),
}

export const defaultState = {
  endpoints       : [],
  tables          : [],
  selectedTable   : '__',
  records         : null,
  table           : null,
  loadingEndpoints: false,
} as DynamonState

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
  selectedTable: string
  records: ItemList
  loadingEndpoints: boolean
  endpoint: Endpoint
  lastEvaluatedKey: any
}

