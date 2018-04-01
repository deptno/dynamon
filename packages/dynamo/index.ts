import * as electron from 'electron'
import * as path from 'path'
import * as url from 'url'

const {app, BrowserWindow} = electron

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    title: 'Dynamo'
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
