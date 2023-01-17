import { readJson, writeJson } from 'fs-extra'
import { appConfigPath, appCookiePath } from './path'

// 读取配置
export async function read() {
  try {
    return await readJson(appConfigPath)
  } catch (e) {
    return Promise.resolve([])
  }
}

// 存储配置
export async function save(appConfig) {
  writeJson(appConfigPath, appConfig, { spaces: '\t' })
}
// 存储配置
export async function clear(appConfig) {
  writeJson(appConfigPath, [], { spaces: '\t' })
}

// 存储配置
export async function readCookie() {
  try {
    return await readJson(appCookiePath)
  } catch (e) {
    return Promise.resolve({})
  }
}

// 存储配置
export async function saveCookie(cookie) {
  writeJson(appCookiePath, cookie, { spaces: '\t' })
}

// // 配置文件变化时
// appConfig$.subscribe(data => {
//   const [appConfig, changed] = data
//   if (changed.length) {
//     // 如果更新则写入配置文件
//     writeJson(appConfigPath, appConfig, { spaces: '\t' })
//     // 如果是从renderer同步过来的数据则不再同步回去，避免重复同步
//     if (!isFromRenderer) {
//       sendData(EVENT_RX_SYNC_MAIN, appConfig).then()
//     }
//   }
// })
