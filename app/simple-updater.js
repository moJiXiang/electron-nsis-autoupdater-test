const {app, BrowserWindow, dialog} =  require('electron');
const autoUpdater =  require('electron-simple-updater');

exports.initialize = function(window) {
    autoUpdater.init({
        build: 'win32-x64',
        channel: 'prod',
        url: 'https://raw.githubusercontent.com/moJiXiang/electron-nsis-autoupdater-test/master/app/updates.json'
    });

    autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName, releaseDate)=> {
        autoUpdater.quitAndInstall()
    })

    autoUpdater.on('update-available', (event)=> {
        console.log('update-available')
    })

    autoUpdater.on('update-not-available', (event)=> {
        console.log('update-not-available')
    })

    window.webContents.once("did-frame-finish-load", (event) => {
        console.log('checking............')
        autoUpdater.checkForUpdates()
    })
}

