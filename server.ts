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

  server.get('*', app.getRequestHandler())
  server.listen(3000, (err) => err || console.log('waiting API call...'))

  const [dispatch, endpoint] = await Promise.all([createWs(), dynamodbLocal()])

  dispatch(Action.ADD_ENDPOINT, endpoint)
})()
