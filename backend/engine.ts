import AWS from 'aws-sdk'
import define from 'dynalee'
import R from 'ramda'

const ddbs: {[key: string]: AWS.DynamoDB} = {

}
export const listTables = async (endpoint) => {
  const ddb = ddbs[endpoint.region] || (
    ddbs[endpoint] = new AWS.DynamoDB(R.pick(['endpoint', 'region'], endpoint))
  )

  if (!ddb) {
    console.error(endpoint, ddb)
  }

  console.log('listTables()', endpoint)
  const list = await ddb.listTables().promise()

  return Promise.all(
    list.TableNames.map(async TableName => {
      const {Table} = await ddb.describeTable({TableName}).promise()
      return Table
    })
  )
}
