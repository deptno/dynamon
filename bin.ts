import carlo from 'carlo'
import os from 'os'
import path from 'path'
import {api} from './backend/api'

(async () => {
  const app = await carlo.launch({
    bgcolor    : '#2b2e3b',
    width      : 1000,
    height     : 500,
    userDataDir: path.join(os.homedir(), __dirname + '/dynamon-data'),
  })
  app.on('exit', () => process.exit())
  app.serveFolder(__dirname + '/out')

  await app.exposeObject('api', api)
  await app.load('index.html')
})()
