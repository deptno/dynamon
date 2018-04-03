import {DynamoDB, config, AWSError} from 'aws-sdk'
import * as url from 'url'

const {AWS_REGION, AWS_DEFAULT_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, LOCAL_DYANMODB_ENDPOINT} = process.env
const awsConfig = {
  region         : AWS_REGION || AWS_DEFAULT_REGION || 'ap-northeast-2',
  accessKeyId    : AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  endpoint       : LOCAL_DYANMODB_ENDPOINT || 'http://localhost:8000'
}

const endpoint = url.parse(awsConfig.endpoint)

config.update(awsConfig)

const dynamodb = new DynamoDB()
const docClient = new DynamoDB.DocumentClient()

export class DynamoEngine {
  private servers: Set<DynamoDbServer> = new Set<DynamoDbServer>()

  async tables(): Promise<DynamoDbTable[]> {
    try {
      const {TableNames} = await dynamodb.listTables({}).promise()

      const tables = await Promise.all(
        TableNames.map(async TableName => {
          const {Table} = await dynamodb.describeTable({TableName}).promise()
          return Table
        })
      )
      return tables.map(table => new DynamoDbTable(table))
    } catch (error) {
      handleError(error)
      return []
    }
  }
}

export class DynamoDbTable {
  constructor(public readonly table: DynamoDB.TableDescription) {
  }

  async scan() {
    return docClient.scan({
      TableName: this.table.TableName
    }).promise()
  }

  keySchema() {
    return this.table.KeySchema
  }

  name() {
    return this.table.TableName
  }
}

function handleError(error: AWSError): void {
  if (!error.retryable) {
    console.error(error)
    throw error
  }
}

type DynamoDbServer = string
