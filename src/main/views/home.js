import { app, BrowserWindow, screen, contextBridge } from 'electron'
import * as path from 'path'
import * as url from 'url'

import { isProd, isLinux } from '../config/env'
import { appIcon } from '../config/icon'
// const winURL = isProd? :`http://localhost:3000/#/`

// if (mode === 'dev') {
//   mainWindow.loadURL('http://localhost:3000/')
// } else {
//     url.format({
//       pathname: path.join(__dirname, './build/index.html'),
//       protocol: 'file:',
//       slashes: true,
//     })
// }
const winURL = !isProd
  ? `http://localhost:3000/#/`
  : url.format({
      pathname: path.join(__dirname, '../../build/index.html'),
      protocol: 'file:',
      slashes: true,
    })

let mainWindow
let readyPromise

/**
 * 创建主视图
 */
export function createWindow() {
  // if (process.platform === 'darwin') {
  //   app.dock.hide()
  // }
  mainWindow = new BrowserWindow({
    // ...getBounds(),
    width: 1200,
    height: 800,
    // backgroundColor: '#00000000',
    movable: true,
    // minimizable: false,
    // autoHideMenuBar: true,
    // hasShadow: false,
    // skipTaskbar: true,
    vibrancy: 'light', // macos
    icon: appIcon,
    title: '下载工具',
    // titleBarStyle: 'hidden',
    // show: !isProd,
    // show: false,
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, '../preload/index.js'),
      webSecurity: isProd,
      nodeIntegration: true,
      experimentalFeatures: true,
      enableRemoteModule: true,
    },
  })

  mainWindow.setMenu(null)
  mainWindow.loadURL(winURL).then(() => {})
  // hide to tray when window closed
  mainWindow.on('close', e => {
    // 当前不是退出APP的时候才去隐藏窗口
    // if (!isQuiting()) {
    //   e.preventDefault()
    //   mainWindow.hide()
    // }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // mainWindow.on('blur', () => {
  //   mainWindow.hide()
  // })

  readyPromise = new Promise(resolve => {
    mainWindow.webContents.once('did-finish-load', resolve)
  })

  // mainWindow.webContents.openDevTools()
}

/**
 * 返回鼠标所在显示器的剪贴板应该所在的 rectangle
 */
export function getBounds() {
  const point = screen.getCursorScreenPoint()
  const display = screen.getDisplayNearestPoint(point)
  const workAreaSize = display.workAreaSize
  return {
    x: display.bounds.x,
    y: isLinux ? display.bounds.y + display.bounds.height : display.bounds.y + workAreaSize.height - 360,
    width: display.bounds.width,
    height: 450,
  }
}

/**
 * 显示主视图
 */
export function showWindow() {
  // if (isWin) {
  //   const { windowManager } = require('node-window-manager')
  //   activeWin = windowManager.getActiveWindow()
  // }
  // console.log(mainWindow)
  if (mainWindow) {
    // mainWindow.setBounds(getBounds())
    mainWindow.show()
    // mainWindow.setBounds(getBounds())
  }
}

/**
 * 向主窗口发送消息
 */
export async function sendData(channel, ...args) {
  if (mainWindow) {
    await readyPromise
    mainWindow.webContents.send(channel, ...args)
  } else {
    console.log('not ready')
  }
}

/**
 * 打开开发者工具
 */
export async function openDevtool() {
  if (mainWindow) {
    await readyPromise
    // mainWindow.webContents.openDevTools()
  } else {
    console.log('not ready')
  }
}
