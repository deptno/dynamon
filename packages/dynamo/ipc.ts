import {engine} from './engine'

export async function ipcHandler({sender}, action) {
  const {type, payload} = action

  switch (type) {
    case 'read tables': {
      const tables = await engine.tables()
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
      const tables = await engine.tables()
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
