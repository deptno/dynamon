import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import TableDescription = DocumentClient.TableDescription
import ItemList = DocumentClient.ItemList
import KeySchema = DocumentClient.KeySchema

const defaultState: RootState = {
  tables: [],
  table: {
    items: [],
    keys: [],
  },
}
export const reducer = (state = defaultState, action: ReturnType<Actions[keyof Actions]>) => {
  if (action.type.startsWith('@')) {
    return state
  }
  if (action.response) {
    switch (action.type) {
      case ActionTypes.SELECT_SERVER:
        return {...state, tables: action.payload}
      case ActionTypes.SELECT_TABLE:
        return {...state, table: action.payload}
    }
  }
  return state
}

/*
 action types
 */
enum ActionTypes {
  SELECT_SERVER = 'get tables',
  SELECT_TABLE = 'select table',
}

/*
 actions
 */
export const actions = {
  getTables: (server = 'http://localhost:8000') => createUniversalAction(ActionTypes.SELECT_SERVER, server),
  selectTable: (tableName: string) => createUniversalAction(ActionTypes.SELECT_TABLE, tableName),
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
