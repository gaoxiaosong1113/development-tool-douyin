import chalk from 'chalk'
import * as puppeteer from 'puppeteer'

import jsonFile from 'jsonFile'
import * as utils from '../utils/utils'
import * as ipc from '../ipc/ipc'
import * as path from '../config/path'
import * as appData from '../config/data'

// 请求地址
const requestPath = `https://www.douyin.com/aweme/v1/web/aweme/post/`

// 主入口
const init = async ({ index }) => {
  return new Promise(async (resolve, reject) => {
    const configData = await appData.read()
    const path = configData[index].path
    if (!path) return

    async function timeout(t) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), t)
      })
    }

    try {
      let dimensions = {}
      // await timeout(1000)
      const browser = await puppeteer.launch()
      let page = await browser.newPage()
      await page.waitFor(500)

      let cookie = utils.getCookie()

      for (let attr in cookie) {
        await page.setCookie({
          name: attr,
          value: cookie[attr],
          domain: 'www.douyin.com',
          path: '/',
          expires: Date.now() + 3600 * 1000,
        })
      }

      await page.goto(path)

      await page.cookies(path)

      dimensions = configData[index]

      // 下载日志
      console.log(`url ---> ${dimensions.path}`)
      console.log(`download` + chalk.green(` START`))

      // 开始下载
      let userId = dimensions.path.split('?')[0].replace('https://www.douyin.com/user/', '')
      let data = []
      utils.readFile({
        requestPath,
        max_cursor: Date.now(),
        path: userId,
        dimensions,
        num: 10,
        page,
        browser,
        data,
        callback: config => {
          browser.close()
          resolve(config)
        },
      })
    } catch (error) {
      console.log(error, 'error')
      reject()
    }
  })
}

module.exports = init
