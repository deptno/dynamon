import {app, BrowserWindow, ipcMain, Menu} from 'electron'
import {ipcHandler} from './ipc'
import {builtInDb} from './built-in-db'
const db = builtInDb()

let mainWindow

app
  .on('ready', createWindow)
  .on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  .on('activate', function() {
    if (mainWindow === null) {
      createWindow()
    }
  })
  .on('before-quit', async function() {
    const controller = await db
    controller.stop()
    console.info('Bye.')
  })

ipcMain.on('action', ipcHandler.bind(null, db))

//
function createWindow() {
  mainWindow = new BrowserWindow({
    width         : 1280,
    height        : 800,
    title         : 'Dynamon',
    webPreferences: {
      nodeIntegration: false,
      preload        : __dirname + '/preload.js',
    },
  })

  mainWindow.loadURL(process.env.ELECTRON_URL || 'file://' +  __dirname + '/client/index.html')
  mainWindow.on('closed', () => (mainWindow = null))
}
