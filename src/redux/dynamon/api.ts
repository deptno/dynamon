import qs from 'querystring'
import {TableDescription} from 'aws-sdk/clients/dynamodb'
import {action, ActionTypes, Endpoint} from './index'

export const api = (type: ActionTypes, body?) =>
  async (dispatch, getState) => {
    switch (type) {
      case ActionTypes.READ_ENDPOINTS: {
        const response = await fetch('/api/endpoints')
        return dispatch(responseAction(ActionTypes.OK_READ_ENDPOINTS, await response.json()))
      }
      case ActionTypes.READ_TABLES: {
        const response = await fetch(`/api/tables?${qs.stringify({region: body})}`)
        return dispatch(responseAction(ActionTypes.OK_READ_ENDPOINTS, await response.json()))
      }
      case ActionTypes.READ_RECORDS: {
        const response = await fetch('/api/records')
        return dispatch(responseAction(ActionTypes.OK_READ_ENDPOINTS, await response.json()))
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
