import * as events from '../shared/events'

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('app', {
  setTitle: title => ipcRenderer.send('set-title', title),
  send: title => ipcRenderer.send('set-title', title),
  getConfig: appConfig => ipcRenderer.invoke(events.EVENT_APP_CONFIG),
  setConfig: appConfig => ipcRenderer.send(events.EVENT_APP_CONFIG_SAVE, appConfig),
  setCookie: appConfig => ipcRenderer.send(events.EVENT_APP_CONFIG_COOKIE, appConfig),
  onUserConfig: callback => ipcRenderer.on(events.EVENT_WEB_USER_INFO, callback),
  download: appConfig => ipcRenderer.invoke(events.EVENT_WEB_DOWNLOAD, appConfig),
  downloadAll: appConfig => ipcRenderer.invoke(events.EVENT_WEB_DOWNLOAD, appConfig),
  getUserData: appConfig => ipcRenderer.send(events.EVENT_WEB_USER, appConfig),
  getSearchData: appConfig => ipcRenderer.send(events.EVENT_WEB_SEARCH, appConfig),
  onUserData: callback => ipcRenderer.on(events.EVENT_WEB_USER, callback),
  onSearchData: callback => ipcRenderer.on(events.EVENT_WEB_SEARCH, callback),
})
