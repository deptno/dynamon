import {Middleware} from 'redux'

export function createUniversalElectronMw(ipc: any, channel: string): Middleware {
  const send = sender()
  const universal = store => next => action => {
    const {universal, ...a} = action

    if (universal) {
      const _ = handleResponse(store, action)
    }

    return next(a)

    //
    async function handleResponse(store, action) {
      const actionFromServer = await send(action)
      console.log('actionFromServer', actionFromServer)
      store.dispatch(actionFromServer)
    }
  }

  return universal

  //
  function sender() {
    const queue = []
    ipc.on(channel, (_, action) => {
      const index = queue.findIndex(a => a.type === action.type)

      if (index !== -1) {
        const [{resolve}] = queue.splice(index, 1)
        resolve({
          ...action,
          response: true
        })
      }
    })

    return (action) => new Promise(resolve => {
      ipc.send(channel, action)
      queue.push({
        type   : action.type,
        resolve
      })
    })
  }
}
