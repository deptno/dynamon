import {DbControl} from './built-in-db'
import {DynamoEngine, Endpoint} from 'dynamo-engine'


let dynamo: DynamoEngine

export async function ipcHandler(db: Promise<DbControl>, {sender}, action) {
  const {type, payload} = action

  switch (type) {
    case 'read endpoints': {
      try {
        const builtInDb = await db
        const ports = Array.from(new Set([8000, builtInDb.port]))
        send(ports
          .map(port => {
            return {
              name    : `빌트인 서버(${port})`,
              region  : `localhost:${port}`,
              endpoint: `http://localhost:${port}`,
            }
          })
          .concat(endpoints),
        )
      } catch (ex) {
        send(endpoints)
      }
      break
    }
    case 'read tables': {
      console.log('p', payload)
      dynamo = engine(payload)
      const tables = await dynamo.tables()
      console.log('tables', tables)
      send(tables.map(table => table.table))
      break
    }

    case 'create table': {
      console.log('create table')
      break
    }
    case 'read table': {
      console.log('read table')
      break
    }
    case 'update table': {
      console.log('update table')
      break
    }
    case 'delete table': {
      console.log('delete table')
      break
    }

    case 'read records': {
      const tables = await dynamo.tables()
      const table = tables.find(table => table.name() === payload)
      const {Items} = await table.scan()
      const keys = table.keySchema()

      send({items: Items, keys: keys})
      break
    }
    case 'create record': {
      console.log('create record')
      break
    }
    case 'update record': {
      console.log('update record')
      break
    }
    case 'delete record': {
      console.log('delete record')
      break
    }
  }

  //
  function send(payload) {
    sender.send('action', {type, payload})
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
      const endgine = new DynamoEngine(endpoint)
      if (forceNew) {
        return (engines[endpoint.region] = endgine)
      }
      return engines[endpoint.region] || (engines[endpoint.region] = endgine)
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

