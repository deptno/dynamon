import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import TableDescription = DocumentClient.TableDescription
import ItemList = DocumentClient.ItemList
import KeySchema = DocumentClient.KeySchema

const defaultState: RootState = {
  tables: [],
  table : {
    items: [],
    keys : [],
  },
}
export const reducer = (state = defaultState, action: ReturnType<Actions[keyof Actions]>) => {
  if (action.type.startsWith('@')) {
    return state
  }
  if (action.response) {
    switch (action.type) {
      case ActionTypes.READ_TABLES:
        return {...state, tables: action.payload}
      case ActionTypes.READ_RECORDS:
        return {...state, table: action.payload}
    }
  }
  return state
}

/*
 action types
 */
enum ActionTypes {
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
}

/*
 actions
 */
export const actions = {
  readTables : (server = 'http://localhost:8000') => createUniversalAction(ActionTypes.READ_TABLES, server),
  readRecords: (tableName: string) => createUniversalAction(ActionTypes.READ_RECORDS, tableName),
}

/*
 internal helper functions
 */
function createAction(type: ActionTypes): TypedAction
function createAction<P>(type: ActionTypes, payload?: P): TypedActionWithPayload<P>
function createAction<P>(type: ActionTypes, payload?: P): TypedAction | TypedActionWithPayload<P> {
  if (payload) {
    return {type, payload}
  }
  return {type}
}
function createUniversalAction<P>(type: ActionTypes, payload: P): TypedUniversalActinoWithPayload<P> {
  return {
    ...createAction(type, payload),
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
  tables: TableDescription[]
  table: DynamoTable
}

interface DynamoTable<T = any> {
  items: ItemList
  keys: KeySchema
}
