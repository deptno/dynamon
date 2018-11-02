import carlo from 'carlo'
import os from 'os'
import path from 'path'

(async () => {
  const app = await carlo.launch({
    bgcolor    : '#2b2e3b',
    width      : 1000,
    height     : 500,
    userDataDir: path.join(os.homedir(), __dirname + '/dynamon-data'),
  })
  app.on('exit', () => process.exit())
  app.serveFolder(__dirname + '/out')
  console.log(__dirname + '/out')
  await app.exposeFunction('hello', hello)
  await app.load('index.html')
})()

async function hello() {
  return 'world'
}