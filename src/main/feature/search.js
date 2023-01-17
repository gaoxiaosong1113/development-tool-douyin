import chalk from 'chalk'
import * as puppeteer from 'puppeteer'
import * as fs from 'fs'

import jsonFile from 'jsonFile'
import * as utils from '../utils/utils'
import * as ipc from '../ipc/ipc'
import * as appData from '../config/data'
import * as configPath from '../config/path'

// 请求地址
const requestPath = `https://www.douyin.com/aweme/v1/web/general/search/single/`

const readFile = async option => {
  const { search, offset = 0, page, callback } = option

  //注入脚本
  const getAppNamesRes = await page.evaluate(
    async external => {
      //将js注入网页

      async function getData() {
        return new Promise((resolve, reject) => {
          /**讲对象转换为url参数形式
           * @property {Object} param 将要转换为URL参数的字符串对象
           * @property {String} key URL 参数字符串的前缀
           * @property {Boolean} encode 是否进行URL编码，默认为true
           * @return {String} URL参数字符串
           */
          function urlEncode(param, key, encode) {
            if (param == null) return ''
            var paramStr = ''
            var t = typeof param
            if (t == 'string' || t == 'number' || t == 'boolean') {
              paramStr += '&' + key + '=' + (encode == null || encode ? encodeURIComponent(param) : param)
            } else {
              for (var i in param) {
                var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
                paramStr += urlEncode(param[i], k, encode)
              }
            }
            return paramStr
          }

          const query = {
            aid: '6383',
            keyword: external.search,
            search_source: 'search_sug',
            offset: external.offset + '',
            count: '10',
          }
          let url = external.requestPath + '?' + urlEncode(query)
          var xhr = new XMLHttpRequest()
          xhr.open('GET', url, !0)
          xhr.timeout = 60000
          xhr.setRequestHeader('Accept', 'application/json, text/plain, */*')
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
          xhr.send()

          xhr.onload = function (e) {
            // if (this.status == 200 || this.status == 304) {
            //   let res = 'response' in xhr ? xhr.response : xhr.responseText
            //   console.log(res)
            // }
            let data = 'response' in xhr ? xhr.response : xhr.responseText
            resolve({
              url,
              query,
              data: JSON.parse(data),
            })
          }
        })
      }

      let result = await getData()

      return {
        cookie: document.cookie,
        url: result.url,
        query: result.query,
        data: result.data,
      }
    },
    { requestPath, search, offset }
  )

  // console.log(getAppNamesRes.data)
  if (getAppNamesRes.data.data) {
    // console.log(JSON.stringify(getAppNamesRes.data.data))
    let video = getAppNamesRes.data.data.reduce((prev, row) => {
      // row.map(item => {
      let awemeInfo = row.aweme_info
      if (!awemeInfo) return prev

      let filepath = `${configPath.defaultDownloadDir}/search/${search}`

      if (awemeInfo.images) {
        prev.push({
          esc: awemeInfo.desc,
          author: awemeInfo.author,
          cover: awemeInfo.video.cover.url_list[0],
          image: awemeInfo.images.map(image => {
            let url = image.url_list[0].split('\u0026from=')[0].replace('\u0026', '&')
            let name = `${awemeInfo.desc}___${awemeInfo.author.nickname}___${awemeInfo.create_time}_${image.uri}.webp`.replaceAll('/', '_')
            var isExist = fs.existsSync(filepath + '/' + name)

            return {
              name,
              url,
              isExist,
            }
          }),
        })
      }
      if (awemeInfo.video) {
        let name = `${awemeInfo.desc}___${awemeInfo.author.nickname}___${awemeInfo.create_time}.mp4`
        var isExist = fs.existsSync(filepath + '/' + name)
        prev.push({
          name,
          isExist,
          esc: awemeInfo.desc,
          author: awemeInfo.author,
          cover: awemeInfo.video.cover.url_list[0],
          video: awemeInfo.video.bit_rate && awemeInfo.video.bit_rate[0] && awemeInfo.video.bit_rate[0].play_addr ? awemeInfo.video.bit_rate[0].play_addr.url_list[2] : '',
        })
      }
      return prev
      // })
    }, [])

    console.log(`total：${video.length}条`)

    option.data = option.data.concat(video)

    if (getAppNamesRes.data.has_more && option.offset < 100) {
      console.log(`download` + chalk.green(` START`))
      readFile({
        ...option,
        offset: option.offset + 10,
      })
    } else {
      console.log(`download ${search} ${chalk.green(` END`)}`)
      callback(option.data)
    }
  } else {
    console.log(`download ${search} ${chalk.grey(` 限流了`)}`)
    let time = setTimeout(() => {
      clearTimeout(time)
      readFile(search, offset)
    }, 3000)
  }
}

// 主入口
const init = async config => {
  return new Promise(async (resolve, reject) => {
    // 保存路径
    let inputRes = {
      path: config.path,
    }

    // 开始处理下载
    console.log(`url ---> ${inputRes.path}`)

    // 打开浏览器
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

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

    await page.goto('https://www.douyin.com/search/' + inputRes.path)

    await page.cookies('https://www.douyin.com/search/' + inputRes.path)

    try {
      let data = []
      readFile({
        search: inputRes.path,
        offset: 0,
        page,
        data,
        callback: config => {
          browser.close()
          resolve(config)
        },
      })
    } catch (error) {
      console.log(`download` + chalk.red(` END`))
      console.log(error)
    }
  })
}

export default init
