import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import TableDescription = DocumentClient.TableDescription
import ItemList = DocumentClient.ItemList

const defaultState: RootState = Object.freeze({
  endpoints: [],
  tables: [],
  records: null,
  table : null,
  loadingEndpoints: false
})
export const reducer = (state = defaultState, action: ReturnType<Actions[keyof Actions]>) => {
  if (action.type.startsWith('@')) {
    return state
  }
  if ('response' in action) {
    switch (action.type) {
      case ActionTypes.READ_ENDPOINTS:
        return {...state, endpoints: action.payload, loadingEndpoints: false}
      case ActionTypes.READ_TABLES:
        return {...state, tables: action.payload}
      case ActionTypes.READ_RECORDS:
        return {...state, records: action.payload}
      case ActionTypes.UPDATE_RECORD:
        console.log(action)
        return state
    }
  }
  switch (action.type) {
    case ActionTypes.READ_ENDPOINTS:
      return {...state, loadingEndpoints: true}
    case ActionTypes.READ_RECORDS:
      return {...state, records: defaultState.records}
    case ActionTypes.READ_TABLES:
      return {...state, tables: defaultState.tables}
    case ActionTypes.SET_TABLE:
      debugger
      return {...state, table: state.tables.find(t => t.TableName === action.payload)}
  }
  return state
}

/*
 action types
 */
enum ActionTypes {
  READ_ENDPOINTS   = 'read endpoints',

  READ_TABLES   = 'read tables',

  CREATE_TABLE  = 'create table',
  READ_TABLE    = 'read table',
  UPDATE_TABLE  = 'update table',
  DELETE_TABLE  = 'delete table',

  CREATE_RECORDS = 'create records',
  READ_RECORDS = 'read records',
  UPDATE_RECORDS = 'update records',
  DELETE_RECORDS = 'delete records',

  CREATE_RECORD = 'create record',
  UPDATE_RECORD = 'update record',
  DELETE_RECORD = 'delete record',

  SET_TABLE = 'set table'
}

/*
 actions
 */
export const actions = {
  setTable: (tableName?: string) => action(ActionTypes.SET_TABLE, tableName),

  readEndpoints : () => universalAction(ActionTypes.READ_ENDPOINTS),
  readTables : (server: Endpoint) => universalAction(ActionTypes.READ_TABLES, server),
  readTable: (tableName?: string) => universalAction(ActionTypes.READ_TABLE, tableName),
  readRecords: (tableName: string) => universalAction(ActionTypes.READ_RECORDS, tableName),
  updateRecord: (tableName: string, record: any) => universalAction(ActionTypes.UPDATE_RECORD, {tableName, record})
}

/*
 internal helper functions
 */
function action(type: ActionTypes): TypedAction
function action<P>(type: ActionTypes, payload: P): TypedActionWithPayload<P>
function action<P>(type: ActionTypes, payload?: P): TypedAction | TypedActionWithPayload<P> {
  if (payload) {
    return {type, payload}
  }
  return {type}
}
function universalAction<P>(type: ActionTypes, payload?: P): TypedUniversalActinoWithPayload<P> {
  return {
    ...action(type, payload),
    universal: true,
  }
}

/*
 types
 */
export type Actions = typeof actions
export interface TypedAction {
  type: ActionTypes
}
export interface TypedActionWithPayload<P> extends TypedAction {
  payload: P
}
export interface TypedUniversalActinoWithPayload<P> extends TypedActionWithPayload<P> {
  readonly universal?: boolean
  readonly response?: boolean
}

export interface RootState {
  endpoints: Endpoint[]
  tables: TableDescription[]
  table: TableDescription
  records: ItemList
  loadingEndpoints: boolean
}

interface Endpoint {
  name: string
  region: string
  endpoint: string
}
