import { app, Tray, Menu, clipboard, globalShortcut, BrowserWindow, ipcMain, dialog, Notification, shell, nativeImage, nativeTheme, BrowserView, screen, desktopCapturer, session, ipcRenderer } from 'electron'
import { run_path } from '../config/path'
import * as helper from '../helper/helper'

import { openDevtool } from '../views/home'

let tray = null

export function createTray() {
  tray = new Tray(`${run_path}/assets/icons/16x16.png`)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '下载',
      click: () => {
        helper.showHomeViewServe()
      },
    },
    {
      label: '更新',
      click: () => {},
    },
    {
      label: '搜索',
      click: () => {},
    },
    {
      label: '开发模式',
      click: () => {
        openDevtool()
      },
    },
    {
      label: '退出',
      click: () => {
        helper.exitApp()
      },
    },
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
}

export function clearTray() {
  tray.destroy()
}
