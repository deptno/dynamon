import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import TableDescription = DocumentClient.TableDescription
import ItemList = DocumentClient.ItemList
import KeySchema = DocumentClient.KeySchema

const defaultState: RootState = {
  tables: [],
  table : {
    items: [],
    keys : [],
  }
}
export const reducer = (state = defaultState, action) => {
  if (!action.type.startsWith('@')) {
    return {
      ...state,
      [action.type]: action.payload
    }
  }
  return state
  // switch (action.type) {
  //   case 'tables':
  //     return {
  //       ...state,
  //       tables: action.payload
  //     }
  //   case 'table':
  //     return {
  //       ...state,
  //       table: action.payload
  //     }
  // }
}

export interface RootState {
  tables: TableDescription[]
  table: DynamoTable
}

interface DynamoTable<T = any> {
  items: ItemList
  keys: KeySchema
}