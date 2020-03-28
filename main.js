const {app, BrowserWindow} = require('electron')

function createWindow() {
    //create the browser window
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    //load the index.html of the app
    win.loadFile('index.html')

    //open dev-tools
    win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

//quit when all windows are closed
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

//for macOS
app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})