import {action, ActionTypes, Endpoint} from './index'
import {TableDescription} from 'aws-sdk/clients/dynamodb'

export const api = (type: ActionTypes, ...args) => {
  return async (dispatch, getState) => {
    switch (type) {
      case ActionTypes.READ_ENDPOINTS: {
        console.log('api call', type)
        const data = await fetch('/api/endpoints')
        console.log(data)
        return ''
      }
      case ActionTypes.READ_TABLES: {
        console.log('api call', type)
        return
      }
      case ActionTypes.READ_RECORDS: {
        console.log('api call', type)
        return
      }
    }
  }
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


export function responseAction<A extends ActionTypes>(type: A): TypedResponseAction<A>
export function responseAction<A extends ActionTypes, P>(type: A, payload: P): TypedResponseActionWithPayload<A, P>
export function responseAction<A extends ActionTypes, P>(type: A, payload?: P) {
  if (payload !== undefined) {
    return {type, payload}
  }
  return {type}
}

export type ResponseActions = typeof responseActions
export type ResponseActionsReturnType = ReturnType<ResponseActions[keyof ResponseActions]>
export interface TypedResponseAction<A> {
  type: A
  response: true
}
export interface TypedResponseActionWithPayload<A, P> extends TypedResponseAction<A> {
  payload: P
}
