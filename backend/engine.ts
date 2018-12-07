import AWS from 'aws-sdk'
import R from 'ramda'
import {createLogger} from './util'
import {define} from 'dynalee'
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import TableDescription = DocumentClient.TableDescription
import {getRecordBox} from './connect-dynamodb-stream'
import * as fetch from 'isomorphic-fetch'

const logger = createLogger(__filename)

const ddbs: {[key: string]: AWS.DynamoDB} = {}
const ddbClients: {[key: string]: AWS.DynamoDB.DocumentClient} = {}
const models = {}
const onlyAwsOptions = R.pick(['region', 'endpoint'])
const getDdb = (endpoint) => ddbs[endpoint.region] || (
  ddbs[endpoint.region] = new AWS.DynamoDB(R.pick(['endpoint', 'region'], endpoint))
)
const getDdbClient = (endpoint) => ddbClients[endpoint.region] || (
  ddbClients[endpoint.region] = new AWS.DynamoDB.DocumentClient(R.pick(['endpoint', 'region'], endpoint))
)
const getModel = (endpoint, table: TableDescription): ReturnType<typeof define> => {
  const tableName = table.TableName
  const hashKey = table.KeySchema.find(k => k.KeyType === 'HASH')
  const rangeKey = table.KeySchema.find(k => k.KeyType === 'RANGE') || {}
  const hashKeyName = hashKey.AttributeName
  const rangeKeyName = hashKey.AttributeName
  const cacheKey = [tableName, hashKeyName, rangeKeyName].join('#')

  if (models[cacheKey]) {
    return models[cacheKey]
  }
  return models[cacheKey] = define(tableName, hashKeyName, rangeKeyName, onlyAwsOptions(endpoint))
}
export const listTables = async (params) => {
  const ddb = getDdb(params.endpoint)
  const list = await ddb.listTables().promise()

  return Promise.all(
    list.TableNames.map(async TableName => {
      const {Table} = await ddb.describeTable({TableName}).promise()
      return Table
    }),
  )
}

export const listRecords = async (params) => {
  const ddb = getDdbClient(params.endpoint)
  const result = await ddb
    .scan({
      TableName: params.tableName,
      Limit    : 100,
    })
    .promise()
  return result
}

export const createTable = async (params) => {
  const ddb = getDdb(params.endpoint)
  return ddb
    .createTable(params.table)
    .promise()
}

export const deleteTable = async (params) => {
  const ddb = getDdb(params.endpoint)
  return ddb
    .deleteTable(params.table)
    .promise()
}

export const scan = async (params) => {
  logger('> scan')
  logger(params)
  const Model = getModel(params.endpoint, params.table)
  const response = await Model
    .scan()
    .filter(and => {
      params.conditions.forEach(c => {
        if (!c.property) {
          return
        }
        if (c.value === undefined) {
          return
        }
        const value = c.type === 'N'
          ? Number(c.value)
          : c.value

        and[c.operator](c.property, value)
      })
    })
    .run()
  logger('response', response)
  return {
    ...response,
    Items: response.Items.map(r => r.head()),
  }
}

export const connectStream = async (params) => {
 const iter = await getRecordBox(params.endpoint, 8000, params.tableName)
  return setInterval(async () => {
    const records = await iter()
    if (!records) {
      return
    }
    if (records.length > 0) {
      // refresh trigger
    }
    if (params.stream && params.stream.endpoint) {
      try {
        await fetch(params.stream.endpoint, {
          method: 'post',
          body: JSON.stringify({Records: records})
        })
      } catch(e) {
        console.log('error', e)
      }
    }

  }, 1000)
}

/**
 * @todo
 */
export const query = async (params) => {
  logger('@todo query')
  logger(params)
  const Model = getModel(params.endpoint, params.table)
  return []
}

export const createDocument = async (params) => {
  logger('@todo createDocument')
  logger(params)
  const Model = getModel(params.endpoint, params.table)
  const document = Model.of(params.document)
  return document.put()
}
export const updateDocument = async (params) => {
  logger('@todo updateDocument')
  logger(params)
}

export const deleteDocument = async (params) => {
  logger('@todo deleteDocument')
  logger(params)
  const {endpoint, table, key} = params
  const Model = getModel(endpoint, table)
  return Model.delete(key)
}

export const createDocuments = async (params) => {
  logger('@todo createDocument')
  logger(params)
  const Model = getModel(params.endpoint, params.table)
  const response = await Model.batchPut(params.documents)
  logger('response', response)
  return response
}