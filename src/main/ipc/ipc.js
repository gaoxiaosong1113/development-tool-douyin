import { ipcMain, clipboard, nativeImage } from 'electron'

import { contextBridge, ipcRenderer } from 'electron'

// import * as jsonfile from 'jsonfile'
import { readJson, writeJson } from 'fs-extra'

import * as homeViewServe from '../views/home'
import download from '../feature/download'
import search from '../feature/search'
import * as appData from '../config/data'

import * as utils from '../utils/utils'

import * as events from '../../shared/events'

// 根据指定用户分享链接获取作品列表
ipcMain.on(events.EVENT_WEB_USER, async (e, params) => {
  let { config, dimensions } = await download({
    path: params.path,
  })

  homeViewServe.sendData(events.EVENT_WEB_USER, config).then()
  homeViewServe.sendData(events.EVENT_WEB_USER_INFO, dimensions).then()
})

// 根据指定搜索内容获取作品列表
ipcMain.on(events.EVENT_WEB_SEARCH, async (e, params) => {
  let data = await search({
    path: params.path,
  })

  homeViewServe.sendData(events.EVENT_WEB_SEARCH, data).then()
})

// 设置cookie
ipcMain.on(events.EVENT_APP_CONFIG_COOKIE, async (e, params) => {
  appData.saveCookie(params)
})

ipcMain.handle(events.EVENT_WEB_USER, async (e, params) => {
  let data = await download({
    path: params.path,
  })
  return data
})

// 下载文件
ipcMain.handle(events.EVENT_WEB_DOWNLOAD, async (e, params) => {
  let data = await utils.downloadVideo(params.dimensions, params.current, params.data)

  return data
})

// 获取内部配置
ipcMain.handle(events.EVENT_APP_CONFIG, async (e, params) => {
  let data = await appData.read()
  return data
})

// 导入配置
ipcMain.on(events.EVENT_APP_CONFIG_SAVE, async (e, params) => {
  let config = await readJson(params.path)

  await appData.save(config)
})

export function changeBindKey(funcName, oldKey, newKey) {
  homeViewServe
    .sendData(events.EVENT_APP_CHANGE_BIND, {
      funcName,
      oldKey,
      newKey,
    })
    .then()
}

export function sendDownloadData(data) {
  homeViewServe
    .sendData(events.EVENT_APP_CHANGE_BIND, {
      data,
    })
    .then()
}
