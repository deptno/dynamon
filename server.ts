import next from 'next'
import express from 'express'
import {createWs} from './backend/ws'
import {dynamodbLocal} from './backend/dynamodb-local'
import {EDynamonActionTypes as Action} from './dynamon-action-types'

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})

!(async () => {
  await app.prepare()
  const server = express()
  const port = 5945

  server.get('*', app.getRequestHandler())
  server.listen(port, (err) => err || console.log('😈 Ready to work'))

  /**
   * DyanmoDB local test
   */
  // const [dispatch, endpoint] = await Promise.all([createWs(), dynamodbLocal()])
  // dispatch({type: Action.ADD_ENDPOINT, payload: endpoint})
  const dispatch = await createWs()
  dispatch({type: Action.ADD_ENDPOINT, payload: {
    name    : 'Dynamon Local DB',
    region  : 'local',
    endpoint: `http://localhost:8000`,
  }})

  console.log(`open http://localhost:${port}`)
})()

