import { app } from 'electron'
import * as path from 'path'
import { ensureDir, pathExists, outputJson } from 'fs-extra'

export const run_path = path.join(path.resolve(__dirname, ''), '../../')
export const staticPath = path.join(__dirname, '../static').replace(/\\/g, '\\\\')

// 应用配置存储目录
export const appConfigDir = app.getPath('userData')
// 应用配置存储路径
export const appConfigPath = path.join(appConfigDir, 'config.json')
export const appCookiePath = path.join(appConfigDir, 'cookie.json')
// 默认的下载目录
export const defaultDownloadDir = path.join(app.getPath('documents'), 'douyin-download')

// 当前可执行程序的路径
export const exePath = app.getPath('exe')

export const readyPromise = new Promise(resolve => {
  if (app.isReady()) {
    resolve()
  } else {
    app.once('ready', resolve)
  }
})
/**
 * 确保文件存在，目录正常
 */
export async function init() {
  await ensureDir(appConfigDir)
  // 判断配置文件是否存在，不存在用默认数据写入
  const configFileExists = await pathExists(appConfigPath)
  if (!configFileExists) {
    await outputJson(appConfigPath, [], { spaces: '\t' })
  }
  await ensureDir(path.join(appConfigDir, 'logs'))

  return readyPromise
}
