const {app, BrowserWindow, screen,ipcMain} = require('electron')

function createWindow() {
    //create the browser window
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    let win = new BrowserWindow({
        width: 300,
        height: 45,
        y: 0,
        x: width - 300,
        resizable: false,
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    //load the index.html of the app
    win.loadFile('index.html')

    //open dev-tools
    // win.webContents.openDevTools()

    ipcMain.on('resize-me-please', (event, arg) => {
        // console.log("args", arg)
        if(arg === 0) arg=45
        win.setSize(300,arg)
    })
}


// app.whenReady().then(createWindow)
app.on('ready', () => setTimeout(createWindow, 300));

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

