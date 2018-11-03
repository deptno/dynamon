import {ItemList, TableDescription} from 'aws-sdk/clients/dynamodb'
import {api} from './api'

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.SET_TABLE:
      return {...state, table: state.tables.find(t => t.TableName === action.payload)}
    case ActionTypes.READ_ENDPOINTS:
      return {...state, loadingEndpoints: true}
    case ActionTypes.READ_RECORDS:
      return {...state, records: defaultState.records}
    case ActionTypes.READ_TABLES:
      return {...state, tables: defaultState.tables}

    case ActionTypes.OK_READ_ENDPOINTS:
      return {...state, endpoints: action.payload, loadingEndpoints: false}
    case ActionTypes.OK_READ_TABLES:
      return {...state, tables: action.payload}
    case ActionTypes.OK_READ_RECORDS:
      return {...state, records: action.payload}
  }
  return state
}

/**
 * action types
 */
export enum ActionTypes {
  SET_TABLE         = 'set table',
  READ_ENDPOINTS    = 'read endpoints',
  OK_READ_ENDPOINTS = 'ok read endpoints',

  READ_TABLES       = 'read tables',
  OK_READ_TABLES    = 'ok read tables',

  CREATE_TABLE      = 'create table',
  READ_TABLE        = 'read table',
  UPDATE_TABLE      = 'update table',
  DELETE_TABLE      = 'delete table',

  CREATE_RECORDS    = 'create records',
  READ_RECORDS      = 'read records',
  OK_READ_RECORDS   = 'ok read records',
  UPDATE_RECORDS    = 'update records',
  DELETE_RECORDS    = 'delete records',

  CREATE_RECORD     = 'create record',
  UPDATE_RECORD     = 'update record',
  DELETE_RECORD     = 'delete record',
}

/**
 * actions
 */
export const actions = {
  setTable     : (tableName: string) => action(false, ActionTypes.SET_TABLE, tableName),
  readEndpoints: () => {
    return (dispatch, getState) => {
      dispatch(action(true, ActionTypes.READ_ENDPOINTS))
      dispatch(api(ActionTypes.READ_ENDPOINTS))
    }
  },
  readTables   : (endpoint: Endpoint['region']) => {
    return (dispatch, getState) => {
      dispatch(action(true, ActionTypes.READ_TABLES))
      dispatch(api(ActionTypes.READ_TABLES, endpoint))
    }
  },
  readTable    : (tableName: string) => action(true, ActionTypes.READ_TABLE, tableName),
  createRecords: (tableName: string, records: any[]) => action(true, ActionTypes.CREATE_RECORDS, {tableName, records}),
  readRecords  : (tableName: string) => {
    return (dispatch, actions) => {
      dispatch(action(true, ActionTypes.READ_RECORDS, tableName))
      dispatch(api(ActionTypes.READ_RECORDS, tableName))
    }
  },
  createRecord : (tableName: string, record: any) => action(true, ActionTypes.CREATE_RECORD, {tableName, record}),
  updateRecord : (tableName: string, record: any) => action(true, ActionTypes.UPDATE_RECORD, {tableName, record}),
  deleteRecord : (record: any) => action(true, ActionTypes.DELETE_RECORD, record),
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
export function action<A extends ActionTypes>(universal: boolean, type: A): TypedAction<A>
export function action<A extends ActionTypes, P>(universal: boolean, type: A, payload: P): TypedActionWithPayload<A, P>
export function action<A extends ActionTypes, P>(universal: boolean, type: A, payload?: P) {
  if (payload !== undefined) {
    return {type, payload, universal}
  }
  return {type, universal}
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

