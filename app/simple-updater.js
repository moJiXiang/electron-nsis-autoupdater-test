const {app, BrowserWindow, dialog} =  require('electron');
const autoUpdater =  require('electron-simple-updater');

exports.initialize = function(window) {
    autoUpdater.init({
        build: 'win32-x64',
        channel: 'prod',
        url: 'https://raw.githubusercontent.com/moJiXiang/electron-nsis-autoupdater-test/master/app/updates.json'
    });


    window.webContents.once("did-frame-finish-load", (event) => {
        console.log('checking............')
        autoUpdater.checkForUpdates()
        autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName, releaseDate)=> {
            dialog.showMessageBox(window, {
                type: 'info',
                title: 'Confirm',
                message: 'update and download'
            }, ()=> {

                autoUpdater.quitAndInstall()
            })
        })

        autoUpdater.on('checking-for-update', (event)=> {
            console.log('checking for update')
            dialog.showMessageBox(window, {
                type: 'info',
                title: 'Confirm',
                message: 'checking for update'
            })
        })

        autoUpdater.on('update-available', (event)=> {
            console.log('update-available')
            dialog.showMessageBox(window, {
                type: 'info',
                title: 'Confirm',
                message: 'update available'
            })
        })

        autoUpdater.on('update-not-available', (event)=> {
            console.log('update-not-available')
        })
    })
}

