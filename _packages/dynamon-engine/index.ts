import {DynamoDB, AWSError} from 'aws-sdk'

const {AWS_REGION, AWS_DEFAULT_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, LOCAL_DYANMODB_ENDPOINT} = process.env
const awsConfig = {
  region         : AWS_REGION || AWS_DEFAULT_REGION || 'ap-northeast-2',
  accessKeyId    : AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  endpoint       : LOCAL_DYANMODB_ENDPOINT || 'http://localhost:8000',
}

export class DynamonEngine {
  private readonly dynamoDb: DynamoDB
  private readonly docClient: DynamoDB.DocumentClient

  constructor({region, endpoint}: Endpoint) {
    const config = {...awsConfig, endpoint, region}
    try {
      this.dynamoDb = new DynamoDB(config)
      this.docClient = new DynamoDB.DocumentClient(config)
    } catch (e) {
      console.log('failOver')
      this.failOver()
    }
  }

  failOver() {
    this.tables = async () => []
  }

  async tables(): Promise<DynamonDbTable[]> {
    try {
      const {TableNames} = await this.dynamoDb.listTables({}).promise()

      const tables = await Promise.all(
        TableNames.map(async TableName => {
          const {Table} = await this.dynamoDb.describeTable({TableName}).promise()
          return Table
        }),
      )
      return tables.map(table => new DynamonDbTable(this.docClient, table))
    } catch (error) {
      handleError(error)
      return []
    }
  }
}

export class DynamonDbTable {
  private static latestAccessed: DynamonDbTable = null

  private static setLatestAccessedTable(table: DynamonDbTable): void {
    this.latestAccessed = table
  }

  static getLatestAccessedTable(): DynamonDbTable {
    return this.latestAccessed
  }

  constructor(private docClient: DynamoDB.DocumentClient, public readonly table: DynamoDB.TableDescription) {
  }

  async scan() {
    DynamonDbTable.setLatestAccessedTable(this)
    return this.docClient
      .scan({TableName: this.table.TableName})
      .promise()
  }

  async puts(TableName, Items) {
    DynamonDbTable.setLatestAccessedTable(this)
    return this.docClient
      .batchWrite({
        RequestItems: {
          [TableName]: Items.map(Item => ({PutRequest: {Item}})),
        },
      })
      .promise()
  }

  async put(TableName, Item) {
    DynamonDbTable.setLatestAccessedTable(this)
    console.log('put', TableName, Item)
    return this.docClient
      .put({TableName, Item})
      .promise()
  }

  async delete(TableName, Key) {
    DynamonDbTable.setLatestAccessedTable(this)
    console.log('delete', {TableName, Key})
    return this.docClient
      .delete({TableName, Key})
      .promise()
  }

  keySchema() {
    DynamonDbTable.setLatestAccessedTable(this)
    return this.table.KeySchema
  }

  name() {
    DynamonDbTable.setLatestAccessedTable(this)
    return this.table.TableName
  }
}

function handleError(error: AWSError): void {
  if (!error.retryable) {
    console.error(error)
    throw error
  }
}

//
export interface Endpoint {
  name: string
  region: string
  endpoint: string
}
