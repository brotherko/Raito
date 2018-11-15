import { app, BrowserWindow, ipcMain } from 'electron'
import _ from 'lodash';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    transparent: true,
    //frame: false,
    toolbar: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
const widgetWindows = {};

ipcMain.on('open_widget_window', (event, { instanceId, options, uri }) => {
  const widgetWindow = new BrowserWindow({
    ...options,
    frame: false,
    transparent: true,
    useContentSize: true,
    fullscreenable: false,
    backgroundColor: '#00000000' // white background after close dev tool fix
  })
  widgetWindow.loadURL(uri)

  const updatePosition = _.debounce(() => {
    const position = widgetWindow.getPosition();
    console.log('update position');
    mainWindow.webContents.send('update_widget_window_position', {
      instanceId,
      position,
    })
  }, 300)

  widgetWindow.on('move', function(event) {
    updatePosition();
  })

  widgetWindow.on('closed', function(event) {
    console.log('closing');
  })

  widgetWindows[instanceId] = widgetWindow;
})

ipcMain.on('close_widget_window', (event, { instanceId }) => {
  widgetWindows[instanceId].close(); 
})

ipcMain.on('set_widget_locked', (event, { instanceId, isLocked }) => {
  widgetWindows[instanceId].setMovable(!isLocked);
  widgetWindows[instanceId].setResizable(!isLocked);
})