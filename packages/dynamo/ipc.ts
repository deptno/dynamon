import {engine} from './engine'

export async function ipcHandler({sender}, action) {
  const {type, payload} = action

  switch (type) {
    case 'get tables': {
      const tables = await engine.tables()
      send(tables.map(table => table.table))
      break
    }
    case 'select table': {
      const tables = await engine.tables()
      const table = tables.find(table => table.name() === payload)
      const {Items} = await table.scan()
      const keys = table.keySchema()

      send({
        items: Items,
        keys : keys
      })
      break
    }
  }

  //
  function send(payload) {
    sender.send('action', {type, payload})
  }
}
