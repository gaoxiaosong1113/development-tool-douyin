import { app, shell, BrowserWindow, screen } from 'electron'

import { isProd, isLinux } from '../config/env'
import { appIcon } from '../config/icon'

import * as homeViewServe from '../views/home'

// 打开指定的url
export function openURL(url) {
  return shell.openExternal(url)
}

// 打开主界面
export function showHomeViewServe() {
  homeViewServe.showWindow()
}

// 退出
export function exitApp() {
  app.quit()
}
