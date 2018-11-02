let dynamon
let DynamonDbTable

export async function ipcHandler(what, action: ActionsReturnType) {
  console.log(what, action)
  const {sender} = what
  switch (action.type) {
    case ActionTypes.READ_ENDPOINTS: {
      const list = endpoints.slice(0)

      try {
        const port = 8000 || 0
        if (port !== 8000) {
          list.unshift({
            name    : `Local DynamoDB Server (0.0.0.0::8000)`,
            region  : `localhost:8000`,
            endpoint: `http://localhost:8000`,
          })
        }
        if (port !== 0) {
          list.unshift({
            name    : `Built-in Local DynamoDB Server (0.0.0.0::${port})`,
            region  : `localhost:${port}`,
            endpoint: `http://localhost:${port}`,
          })
        }
      } catch (ex) {
      } finally {
        response(responseActions.readEndpoints(list))
      }
      break
    }
    case ActionTypes.READ_TABLES: {
      dynamon = engine(action.payload)
      const tables = await dynamon.tables()
      response(responseActions.readTables(tables.map(table => table.table)))
      break
    }

    // case ActionTypes.CREATE_TABLE: {
    //   break
    // }
    case ActionTypes.READ_TABLE: {
      const table = DynamonDbTable.getLatestAccessedTable()
      response(responseActions.readTable(table.table))
      console.log('read table', action.payload)
      break
    }
    // case ActionTypes.UPDATE_TABLE: {
    //   console.log('update table', action.payload)
    //   break
    // }
    // case ActionTypes.DELETE_TABLE: {
    //   console.log('delete table', action.payload)
    //   break
    // }

    case ActionTypes.CREATE_RECORDS: {
      const table = DynamonDbTable.getLatestAccessedTable()
      const result = await table.puts(table.name(), action.payload.records)
      response(responseActions.createRecords(result))
      break
    }
    case ActionTypes.READ_RECORDS: {
      const tables = await dynamon.tables()
      const table = tables.find(table => table.name() === action.payload)
      const result = await table.scan()
      response(responseActions.readRecords(result.Items))
      break
    }
    case ActionTypes.UPDATE_RECORD:
    case ActionTypes.CREATE_RECORD: {
      const table = DynamonDbTable.getLatestAccessedTable()
      try {
        const ret = await table.put(table.name(), action.payload.record)
        response(responseActions.updateRecord(action.payload.record))
        console.log('update record', action.payload, 'ret', ret)
      } catch (ex) {
        console.log('update record', action.payload, 'ex', ex)
        response(responseActions.updateRecord(null))
      }
      break
    }
    case ActionTypes.DELETE_RECORD: {
      const table = DynamonDbTable.getLatestAccessedTable()
      try {
        const Key = table
          .keySchema()
          .reduce((p, c) => {
            p[c.AttributeName] = action.payload[c.AttributeName]
            return p
          }, {})
        await table.delete(table.name(), Key)
      } catch (ex) {
      } finally {
        response(responseActions.deleteRecord())
      }
      break
    }
    default:
      console.log('unhandled action', JSON.stringify(action, null, 2))
  }

  //
  function response(action: ResponseActionsReturnType) {
    return sender.send('action', action)
  }
}

const endpoints = [
  {name: 'US East (Ohio)', region: 'us-east-2', endpoint: 'dynamodb.us-east-2.amazonaws.com'},
  {name: 'US East (N. Virginia)', region: 'us-east-1', endpoint: 'dynamodb.us-east-1.amazonaws.com'},
  {name: 'US West (N. California)', region: 'us-west-1', endpoint: 'dynamodb.us-west-1.amazonaws.com'},
  {name: 'US West (Oregon)', region: 'us-west-2', endpoint: 'dynamodb.us-west-2.amazonaws.com'},
  {name: 'Asia Pacific (Tokyo)', region: 'ap-northeast-1', endpoint: 'dynamodb.ap-northeast-1.amazonaws.com'},
  {name: 'Asia Pacific (Seoul)', region: 'ap-northeast-2', endpoint: 'dynamodb.ap-northeast-2.amazonaws.com'},
  {name: 'Asia Pacific (Osaka-Local)', region: 'ap-northeast-3', endpoint: 'dynamodb.ap-northeast-3.amazonaws.com'},
  {name: 'Asia Pacific (Mumbai)', region: 'ap-south-1', endpoint: 'dynamodb.ap-south-1.amazonaws.com'},
  {name: 'Asia Pacific (Singapore)', region: 'ap-southeast-1', endpoint: 'dynamodb.ap-southeast-1.amazonaws.com'},
  {name: 'Asia Pacific (Sydney)', region: 'ap-southeast-2', endpoint: 'dynamodb.ap-southeast-2.amazonaws.com'},
  {name: 'Canada (Central)', region: 'ca-central-1', endpoint: 'dynamodb.ca-central-1.amazonaws.com'},
  {name: 'China (Beijing)', region: 'cn-north-1', endpoint: 'dynamodb.cn-north-1.amazonaws.com.cn'},
  {name: 'China (Ningxia)', region: 'cn-northwest-1', endpoint: 'dynamodb.cn-northwest-1.amazonaws.com.cn'},
  {name: 'EU (Frankfurt)', region: 'eu-central-1', endpoint: 'dynamodb.eu-central-1.amazonaws.com'},
  {name: 'EU (Ireland)', region: 'eu-west-1', endpoint: 'dynamodb.eu-west-1.amazonaws.com'},
  {name: 'EU (London)', region: 'eu-west-2', endpoint: 'dynamodb.eu-west-2.amazonaws.com'},
  {name: 'EU (Paris)', region: 'eu-west-3', endpoint: 'dynamodb.eu-west-3.amazonaws.com'},
  {name: 'South America (Sao Paulo)', region: 'sa-east-1', endpoint: 'dynamodb.sa-east-1.amazonaws.com'},
  {name: 'AWS GovCloud (US)', region: 'us-gov-w', endpoint: 'st-1	dynamodb.us-gov-west-1.amazonaws.com'},
]

const engine = createEngineGetter()

function createEngineGetter() {
  const engines = {}

  return function getEngine(endpoint: Endpoint, forceNew?: boolean) {
    console.log('cache', engines)
    try {
      const engine = (...args) => console.log('endgine', ...args)
      if (forceNew) {
        return (engines[endpoint.region] = engine)
      }
      return engines[endpoint.region] || (engines[endpoint.region] = engine)
    } catch (ex) {
      console.error(ex)
      console.error('error')
      return {
        tables: () => [],
      }
    }
  }
}







//
import {ItemList, TableDescription} from 'aws-sdk/clients/dynamodb'

/**
 * action types
 */
export enum ActionTypes {
  SET_TABLE      = 'set table',
  READ_ENDPOINTS = 'read endpoints',

  READ_TABLES    = 'read tables',

  CREATE_TABLE   = 'create table',
  READ_TABLE     = 'read table',
  UPDATE_TABLE   = 'update table',
  DELETE_TABLE   = 'delete table',

  CREATE_RECORDS = 'create records',
  READ_RECORDS   = 'read records',
  UPDATE_RECORDS = 'update records',
  DELETE_RECORDS = 'delete records',

  CREATE_RECORD  = 'create record',
  UPDATE_RECORD  = 'update record',
  DELETE_RECORD  = 'delete record',
}

/**
 * actions
 */
export const actions = {
  setTable: (tableName: string) => action(false, ActionTypes.SET_TABLE, tableName),
  readEndpoints: () => action(true, ActionTypes.READ_ENDPOINTS),
  readTables   : (endpoint: Endpoint) => action(true, ActionTypes.READ_TABLES, endpoint),
  readTable    : (tableName: string) => action(true, ActionTypes.READ_TABLE, tableName),
  createRecords: (tableName: string, records: any[]) => action(true, ActionTypes.CREATE_RECORDS, {tableName, records}),
  readRecords  : (tableName: string) => action(true, ActionTypes.READ_RECORDS, tableName),
  createRecord : (tableName: string, record: any) => action(true, ActionTypes.CREATE_RECORD, {tableName, record}),
  updateRecord : (tableName: string, record: any) => action(true, ActionTypes.UPDATE_RECORD, {tableName, record}),
  deleteRecord : (record: any) => action(true, ActionTypes.DELETE_RECORD, record),
}
//responseActions shouldn't be dispatched by frontend
export const responseActions = {
  readEndpoints: (endpoints: Endpoint[]) => responseAction(ActionTypes.READ_ENDPOINTS, endpoints),
  readTables   : (tables: TableDescription[]) => responseAction(ActionTypes.READ_TABLES, tables),
  readTable    : (table: TableDescription) => responseAction(ActionTypes.READ_TABLE, table),
  createRecords: (result) => action(true, ActionTypes.CREATE_RECORDS, result),
  readRecords  : (records: any[]) => responseAction(ActionTypes.READ_RECORDS, records),
  updateRecord : (record: any) => responseAction(ActionTypes.UPDATE_RECORD, record),
  deleteRecord : () => responseAction(ActionTypes.DELETE_RECORD),
}

/*
 internal helper functions
 */
export function action<A extends ActionTypes>   (universal: boolean, type: A): TypedAction<A>
export function action<A extends ActionTypes, P>(universal: boolean, type: A, payload: P): TypedActionWithPayload<A, P>
export function action<A extends ActionTypes, P>(universal: boolean, type: A, payload?: P) {
  if (payload !== undefined) {
    return {type, payload, universal}
  }
  return {type, universal}
}

export function responseAction<A extends ActionTypes>(type: A): TypedResponseAction<A>
export function responseAction<A extends ActionTypes, P>(type: A, payload: P): TypedResponseActionWithPayload<A, P>
export function responseAction<A extends ActionTypes, P>(type: A, payload?: P) {
  if (payload !== undefined) {
    return {type, payload}
  }
  return {type}
}

/*
 types
 */
export type Actions = typeof actions
export type ActionsReturnType = ReturnType<Actions[keyof Actions]>
export type ResponseActions = typeof responseActions
export type ResponseActionsReturnType = ReturnType<ResponseActions[keyof ResponseActions]>
export interface TypedAction<A> {
  type: A
  universal: boolean
}
export interface TypedActionWithPayload<A, P> extends TypedAction<A> {
  payload: P
}

export interface TypedResponseAction<A> {
  type: A
  response: true
}
export interface TypedResponseActionWithPayload<A, P> extends TypedResponseAction<A> {
  payload: P
}

export interface Endpoint {
  name: string
  region: string
  endpoint: string
}

/**
 * copy from dynamon
 */
const defaultState: DynamonState = {
  endpoints       : [],
  tables          : [],
  records         : null,
  table           : null,
  loadingEndpoints: false,
}
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

export interface DynamonState {
  endpoints: Endpoint[]
  tables: TableDescription[]
  table: TableDescription
  records: ItemList
  loadingEndpoints: boolean
}
