import next from 'next'
import {route} from './backend/route'
import express from 'express'

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

!(async () => {
  await app.prepare()
  const server = express()

  server.get(/^\/api\/*/, route)
  server.get('*', handle)

  server.listen(3000, (err) => err || console.log('waiting API call...'))
})()
