import next from 'next'
import express from 'express'
import {createWs} from './backend/ws'
import {EDynamonActionTypes as Action} from './dynamon-action-types'
import * as R from 'ramda'
import fs from 'fs'
import path from 'path'

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev, dir: __dirname})
const version = R.compose(R.concat('v'), R.prop('version'), JSON.parse, fs.readFileSync)

!(async () => {
  await app.prepare()
  const server = express()
  const port = 5500

  server.get('*', app.getRequestHandler())
  server.listen(port, err => console.log(
    R.concat(
      `${version(path.join(__dirname, '/package.json'))} `,
      err || `😈 Ready to work, open http://localhost:${port}`),
    ),
  )

  const dispatch = await createWs()

  dispatch({
    type: Action.ADD_ENDPOINT, payload: {
      name    : 'Dynamon Local DB',
      region  : 'dynamon',
      endpoint: `http://localhost:8000`,
    },
  })
}
)()

