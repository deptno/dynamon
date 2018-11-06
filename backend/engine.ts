import AWS from 'aws-sdk'
import R from 'ramda'

const ddbs: {[key: string]: AWS.DynamoDB} = {}
const ddbClients: {[key: string]: AWS.DynamoDB.DocumentClient} = {}

const getDdb = (endpoint) => ddbs[endpoint.region] || (
  ddbs[endpoint.region] = new AWS.DynamoDB(R.pick(['endpoint', 'region'], endpoint))
)
const getDdbClient = (endpoint) => ddbClients[endpoint.region] || (
  ddbClients[endpoint.region] = new AWS.DynamoDB.DocumentClient(R.pick(['endpoint', 'region'], endpoint))
)
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
      Limit: 100,
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
