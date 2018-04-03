import {DynamoDbTable, DynamoEngine} from '../index'

describe('dynamo engine', () => {
  const engine = new DynamoEngine()
  let tables: DynamoDbTable[]
  it('tables()', async done => {
    tables = await engine.tables()
    console.log(JSON.stringify(tables, null, 2))
    expect(tables).toBeTruthy()
    done()
  })

  describe('dynamo db table', () => {
    it('tables()', async done => {
      const [table] = tables
      const data = await table.scan()
      console.log(data)
      done()
    })
  })
})
