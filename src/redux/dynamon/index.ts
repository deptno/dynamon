import {ItemList, TableDescription} from 'aws-sdk/clients/dynamodb'
import * as R from 'ramda'
import {EDynamonActionTypes as Action} from '../../../dynamon-action-types'

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case Action.SET_TABLE: {
      const table = state.tables.find(t => t.TableName === action.payload)
      const indexes = table
        ? [...table.GlobalSecondaryIndexes || [], ...table.LocalSecondaryIndexes || []]
        : []
      const keys = table
        ? table.KeySchema.reduce((ret, key, i) => {
          ret.push(R.merge(key, table.AttributeDefinitions.find(a => a.AttributeName === key.AttributeName)))
          return ret
        }, [])
        : []
      return {
        ...state,
        table,
        indexes,
        keys,
        selectedTable: table
          ? table.TableName
          : defaultState.selectedTable,
      }
    }
    case Action.READ_ENDPOINTS:
      return {...state, loadingEndpoints: true}
    case Action.READ_DOCUMENTS:
      return {...state, documents: defaultState.documents}
    case Action.READ_TABLES:
      return {...state, tables: defaultState.tables, endpoint: action.payload.endpoint}

    case Action.OK_READ_ENDPOINTS:
      return {...state, endpoints: action.payload, loadingEndpoints: false}
    case Action.ADD_ENDPOINT:
      return {...state, endpoints: [action.payload].concat(state.endpoints)}
    case Action.OK_READ_TABLES:
      return {...state, tables: action.payload}
    // @todo unify interface OK_SCAN OK_QUERY OK_READ_RECORDS
    case Action.OK_SCAN:
      return {...state, documents: action.payload.Items || [], lastEvaluateKey: action.payload.LastEvaluatedKey}
    case Action.OK_READ_DOCUMENTS:
      return {...state, documents: action.payload.Items || [], lastEvaluateKey: action.payload.LastEvaluatedKey}
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
   * @todo endpoint, table, documents
   */
  createDocument(document: any) {
    return async (dispatch, getState, {send}) => {
      const {endpoint, table} = getState().dynamon
      return dispatch(R.tap(await send, action(Action.CREATE_DOCUMENT, {
        endpoint,
        table,
        document,
      })))
    }
  },
  /**
   * @todo endpoint, table, documents
   */
  createDocuments(documents: any[]) {
    return async (dispatch, getState, {send}) => {
      const {endpoint, table} = getState().dynamon
      return dispatch(R.tap(await send, action(Action.CREATE_DOCUMENTS, {
        endpoint,
        table,
        documents,
      })))
    }
  },
  readDocuments : (tableName: string) => {
    return async (dispatch, getState, {send}) => {
      dispatch(R.tap(await send, action(Action.READ_DOCUMENTS, {
        endpoint: getState().dynamon.endpoint,
        tableName,
      })))
    }
  },
  updateDocument: (tableName: string, document: any) => action(Action.UPDATE_DOCUMENT, {tableName, document}),
  deleteDocument: (document: any) => action(Action.DELETE_DOCUMENT, document),
}

export const defaultState = {
  endpoints       : [],
  tables          : [],
  indexes         : [],
  keys            : [],
  selectedTable   : '__',
  documents       : null,
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
  indexes: TableDescription['GlobalSecondaryIndexes'] & TableDescription['LocalSecondaryIndexes']
  keys: (DynamonState['table']['KeySchema'][0] & DynamonState['table']['AttributeDefinitions'][0])[]
  selectedTable: string
  documents: ItemList
  loadingEndpoints: boolean
  endpoint: Endpoint
  lastEvaluatedKey: any
}

