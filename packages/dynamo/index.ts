import * as electron from 'electron'
import * as path from 'path'
import * as url from 'url'

console.log(process.env.ELECTRON_URL || path.join(__dirname, '..', 'dynamo-fe', 'dist', 'index.html'))
const {app, BrowserWindow} = electron

let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Dynamo'
  })
  process.cwd()

  // and load the index.html of the app.
  mainWindow.loadURL(process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '..', 'dynamo-fe', 'dist', 'index.html'),
    protocol: 'file:',
    slashes : true
  }))
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
