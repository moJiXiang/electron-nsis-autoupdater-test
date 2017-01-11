'use strict'

const exec = require('child_process').exec
const builder = require('electron-builder')
const packager = require('electron-packager')
const path = require('path')

if (process.env.PLATFORM_TARGET === 'clean') {
  require('del').sync(['builds/*', '!.gitkeep'])
  console.log('\x1b[33m`builds` directory cleaned.\n\x1b[0m')
} else electronBuilder()

/**
 * Build webpack in production
 */
function pack () {
  console.log('\x1b[33mBuilding webpack in production mode...\n\x1b[0m')
  let pack = exec('npm run pack')

  pack.stdout.on('data', data => console.log(data))
  pack.stderr.on('data', data => console.error(data))
  pack.on('exit', code => build())
}

/**
 * Use electron-packager to build electron app
 */
function build () {
  let options = require('../config').building

  console.log('\x1b[34mBuilding electron app(s)...\n\x1b[0m')
  packager(options, (err, appPaths) => {
    if (err) {
      console.error('\x1b[31mError from `electron-packager` when building app...\x1b[0m')
      console.error(err)
    } else {
      console.log('Build(s) successful!')
      console.log(appPaths)

      console.log('\n\x1b[34mDONE\n\x1b[0m')
    }
  })
}

function electronBuilder() {
  builder.build({
    targets: builder.Platform.WINDOWS.createTarget(),
    devMetadata: {
      build: {
        appId: "elina",
        asar: false,
        "publish": {
          "provider": "generic",
          "url": "" // here is you https:// upload url
        },
        "win": {
          "target": "squirrel"
        },
        // "win": {
        //   "target": ["nsis"], // "dir" build win-unpacked
        //   "icon": path.join(__dirname, '../app/icons/icon.ico')
        // },
        // "nsis": {
        //   "language": 2052,
        //   "installerHeader": path.join(__dirname, "../build/installerHeader.bmp"),
        //   "installerHeaderIcon": path.join(__dirname, "../build/installerHeaderIcon.ico"),
        //   "script": path.join(__dirname, '../build/installer.nsi'),
        //   "oneClick": false
        // }
      },
      directories: {
        output: 'dist'
      }
    }
  })
  .then(()=> {

  })
  .catch((err)=> {
    console.log(err)
  })
}