//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
   // squirrel event handled and app will exit in 1000ms, so don't do anything else
   return;
}
var path = require('path')

const {app, BrowserWindow, screen,ipcMain} = require('electron')

function createWindow() {
    //create the browser window
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    let win = new BrowserWindow({
        width: 300,
        height: 45,
        y: 0,
        x: width - 300,
        // skipTaskbar: true,
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
        win.setMinimumSize(300,arg)
        win.setSize(300,arg)
    })
    
    // "floating" + 1 is higher than all regular windows, but still behind things 
    // like spotlight or the screen saver
    // win.setAlwaysOnTop(true, "floating", 1);
    // // allows the window to show over a fullscreen window
    win.setVisibleOnAllWorkspaces(true);
    
    
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

