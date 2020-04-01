const {app, BrowserWindow, screen} = require('electron')

function createWindow() {
    //create the browser window
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    let win = new BrowserWindow({
        width: 350,
        height: 400,
        y: 0,
        x: width - 350,
        // resizable: false,
        alwaysOnTop: true,
        frame: false,
        transparent: true,
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

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})