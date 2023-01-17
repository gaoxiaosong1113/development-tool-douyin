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
const init = async config => {
  return new Promise(async (resolve, reject) => {
    // 保存路径
    let inputRes = {
      path: config.path,
    }

    const regexp = /((http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/gi
    const path = inputRes.path.match(regexp)

    if (!path[0]) return

    const configData = await appData.read()

    // 打开浏览器
    const browser = await puppeteer.launch()

    const page = await browser.newPage()

    let cookie = await utils.getCookie()
    cookie['domain'] = 'douyin.com'
    console.log(cookie)

    for (let attr in cookie) {
      await page.setCookie({
        name: attr,
        value: cookie[attr],
        domain: 'v.douyin.com',
        path: '/',
        expires: Date.now() + 3600 * 1000,
      })
    }
    for (let attr in cookie) {
      await page.setCookie({
        name: attr,
        value: cookie[attr],
        domain: 'www.douyin.com',
        path: '/',
        expires: Date.now() + 3600 * 1000,
      })
    }

    for (let attr in cookie) {
      await page.setCookie({
        name: attr,
        value: cookie[attr],
        domain: 'www.iesdouyin.com',
        path: '/',
        expires: Date.now() + 3600 * 1000,
      })
    }

    await page.goto(path[0])

    await page.cookies(path[0])

    //注入脚本
    const dimensions = await page.evaluate(async evaluate => {
      //将js注入网页
      async function timeout(t) {
        return new Promise((resolve, reject) => {
          setTimeout(() => resolve(), t)
        })
      }
      await timeout(2000)

      let titleDom = document.querySelector('.Nu66P_ba')
      let title = ''
      if (titleDom) {
        title = titleDom.innerText
      }

      return {
        avatar: document.querySelectorAll('.PbpHcHqa')[1]?.src || document.querySelectorAll('.RUVTDzAp')[0]?.src,
        path: window.location.href,
        title: title || document.title.split('的主页')[0],
        cookie: document.cookie,
      }
    })

    console.log(cookie)
    // 被拦截了
    if (dimensions.title.indexOf('验证码') != -1) {
      console.log('验证码...  END')
      reject()
      return
    }

    // 替换config
    let dataIndex
    const filterConfigData = configData.filter((item, index) => {
      if (item.path == dimensions.path) {
        dataIndex = index
        return true
      }
      return false
    })[0]
    if (!filterConfigData) {
      configData.push({
        url: inputRes.path,
        ...dimensions,
      })
      appData.save(configData)
    } else {
      if (filterConfigData.complete === true) {
        console.log('已下载...')
        return
      }
      if (!filterConfigData.avatar) {
        configData[dataIndex] = {
          url: inputRes.path,
          ...dimensions,
        }

        appData.save(configData)
      }
      // console.log(filterConfigData.title + ' ---> 历史下载')
    }

    // 开始处理下载
    // console.log(`url ---> ${dimensions.path}`)
    try {
      console.log(`download` + chalk.green(` START`))
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
          // 下载完成打标记
          configData.forEach(item => {
            if (item.path == dimensions.path) {
              // item.complete = true
            }
          })
          appData.save(configData)
          resolve({ config, dimensions })
        },
      })
    } catch (error) {
      console.log(`download` + chalk.red(` END`))
      console.log(error)
      resolve(error)
    }
  })
}

export default init
