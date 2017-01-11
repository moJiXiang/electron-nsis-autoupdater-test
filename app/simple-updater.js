const {app, BrowserWindow, dialog} =  require('electron');
const autoUpdater =  require('electron-simple-updater');

exports.initialize = function(window) {
    autoUpdater.addListener("update-available", (event)=> {
        dialog.showMessageBox(
            window,
            {
                type: 'info',
                title: 'Confirm',
                message: 'A new update is available'
            });
        console.log("A new update is available")
    })

    autoUpdater.addListener("update-downloaded", (event, releaseNotes, releaseName, releaseDate)=> {
        dialog.showMessageBox(
            window,
            {
                type: 'info',
                title: 'Confirm',
                message: 'quit and install'
            }, ()=> {

                autoUpdater.quitAndInstall()
            });
    })

    autoUpdater.addListener('error', (error)=> {
        console.log(error)
        dialog.showMessageBox(
        window,
        {
            type: 'info',
            title: 'Confirm',
            message: error.message
        });
    })

    autoUpdater.addListener('checking-for-update', (event)=> {
        console.log("checking-for-update")
        dialog.showMessageBox(
        window,
        {
            type: 'info',
            title: 'Confirm',
            message: 'checking-for-update'
        });
    })

    window.webContents.once("did-frame-finish-load", (event) => {
        autoUpdater.checkForUpdates()
    })
}

