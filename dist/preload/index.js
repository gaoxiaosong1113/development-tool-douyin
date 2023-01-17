"use strict";
const EVENT_APP_CONFIG = "app.config";
const EVENT_APP_CONFIG_SAVE = "app.config.save";
const EVENT_APP_CONFIG_COOKIE = "app.config.cookie";
const EVENT_WEB_USER = "web.user";
const EVENT_WEB_USER_INFO = "web.user.info";
const EVENT_WEB_SEARCH = "web.search";
const EVENT_WEB_DOWNLOAD = "web.download";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("app", {
  setTitle: (title) => ipcRenderer.send("set-title", title),
  send: (title) => ipcRenderer.send("set-title", title),
  getConfig: (appConfig) => ipcRenderer.invoke(EVENT_APP_CONFIG),
  setConfig: (appConfig) => ipcRenderer.send(EVENT_APP_CONFIG_SAVE, appConfig),
  setCookie: (appConfig) => ipcRenderer.send(EVENT_APP_CONFIG_COOKIE, appConfig),
  onUserConfig: (callback) => ipcRenderer.on(EVENT_WEB_USER_INFO, callback),
  download: (appConfig) => ipcRenderer.invoke(EVENT_WEB_DOWNLOAD, appConfig),
  downloadAll: (appConfig) => ipcRenderer.invoke(EVENT_WEB_DOWNLOAD, appConfig),
  getUserData: (appConfig) => ipcRenderer.send(EVENT_WEB_USER, appConfig),
  getSearchData: (appConfig) => ipcRenderer.send(EVENT_WEB_SEARCH, appConfig),
  onUserData: (callback) => ipcRenderer.on(EVENT_WEB_USER, callback),
  onSearchData: (callback) => ipcRenderer.on(EVENT_WEB_SEARCH, callback)
});
