import {DbControl} from './built-in-db'
import {DynamonDbTable, DynamonEngine, Endpoint} from 'dynamon-engine'
import {ActionsReturnType, ActionTypes, responseActions, ResponseActionsReturnType} from 'dynamon-redux-actions'

let dynamon: DynamonEngine

export async function ipcHandler(db: Promise<DbControl>, {sender}, action: ActionsReturnType) {
  switch (action.type) {
    case ActionTypes.READ_ENDPOINTS: {
      const list = endpoints.slice(0)

      try {
        const {port} = await db

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
        console.log(list)
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
    // case ActionTypes.DELETE_RECORD: {
    //   console.log('delete record', action.payload)
    //   break
    // }
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
      const engine = new DynamonEngine(endpoint)
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
