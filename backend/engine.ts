import AWS from 'aws-sdk'
import define from 'dynalee'
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

  if (!ddb) {
    console.error(params.endpoint, ddb)
  }

  console.log('listTables()', params)
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
  return result.Items || []
}
