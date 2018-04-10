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
    icon          : __dirname + '/build/icon.png',
    webPreferences: {
      nodeIntegration: false,
      preload        : __dirname + '/preload.js',
    },
  })

  mainWindow.loadURL(process.env.ELECTRON_URL || 'file://' + __dirname + '/client/index.html')
  mainWindow.on('closed', () => (mainWindow = null))

  const template = [
    {
      label  : 'Application',
      submenu: [
        {label: 'About Dynamon', selector: 'orderFrontStandardAboutPanel:'},
        {
          label: 'Quit', accelerator: 'Command+Q', click() {
            app.quit()
          },
        },
      ],
    }, {
      label  : 'Edit',
      submenu: [
        {label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:'},
        {label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:'},
        {label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:'},
        {label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:'},
        {label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:'},
        {label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:'},
      ],
    }
  ]
  mainWindow.openDevTools()

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}
