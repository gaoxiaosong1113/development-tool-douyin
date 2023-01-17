import { app, contextBridge, globalShortcut, ipcRenderer } from 'electron'

import * as trayFeature from './feature/tray'

import * as homeViewServe from './views/home'

import { init as initIcon } from './config/icon'
import { init as initPath } from './config/path'

import './ipc/ipc'

// 解决透明闪烁
app.commandLine.appendSwitch('wm-window-animations-disabled')

app.whenReady().then(e => {
  console.log('启动完成')
  initIcon()
  initPath()

  trayFeature.createTray()

  // configData.clear()
  homeViewServe.createWindow()
})

//  退出
app.on('will-quit', () => {
  // Unregister all shortcuts.
  // 删除临时文件夹
  // 注销全局快捷键。
  globalShortcut.unregisterAll()
  console.log('will-quit')
})

app.on('before-quit', event => {
  console.log('before-quit')
  trayFeature.clearTray()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// app.dock.hide()
