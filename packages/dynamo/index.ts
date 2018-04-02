import {app, BrowserWindow, ipcMain} from 'electron'
import * as path from 'path'
import * as url from 'url'
import {engine} from './engine'

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width         : 1024,
    height        : 800,
    title         : 'Dynamo',
    webPreferences: {
      nodeIntegration: false,
      preload        : __dirname + '/preload.js'
    }
  })
  mainWindow.loadURL(process.env.ELECTRON_URL || url.format({
    pathname: path.join(__dirname, '..', 'dynamo-fe', 'dist', 'index.html'),
    protocol: 'file:',
    slashes : true
  }))
  mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})


ipcMain.on('channel', async ({sender}, args) => {
  const tables = await engine.tables()
  sender.send('channel', {type: 'tables', payload: tables.map(table => table.table)})
  const [table] = tables
  const {Items} = await table.scan()
  const keys = table.keySchema()
  sender.send('channel', {
    type   : 'table',
    payload: {
      items: Items,
      keys : keys
    }
  })
})

