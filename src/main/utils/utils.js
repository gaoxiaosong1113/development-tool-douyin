import fs from 'fs'
import chalk from 'chalk'
import download from 'download'
import * as puppeteer from 'puppeteer'

import * as configPath from '../config/path'
import * as configData from '../config/data'

/**讲对象转换为url参数形式
 * @property {Object} param 将要转换为URL参数的字符串对象
 * @property {String} key URL 参数字符串的前缀
 * @property {Boolean} encode 是否进行URL编码，默认为true
 * @return {String} URL参数字符串
 */
export function urlEncode(param, key, encode) {
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

export const readFile = async option => {
  // console.log(option, 'option')
  const { requestPath, max_cursor, path, callback, dimensions, num, page, browser } = option

  let getAppNamesRes
  try {
    //注入脚本
    getAppNamesRes = await page.evaluate(
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
              screen_height: 1964,
              screen_width: 3024,
              webid: 7180727602210391613,
              effective_type: 'wifi',
              count: external.num,
              aid: 6383,
              publish_video_strategy_type: 2,
              show_live_replay_strategy: 1,
              sec_user_id: external.path,
              max_cursor: external.max_cursor,
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
                data: JSON.parse(data),
              })
            }
          })
        }

        if (document.title == '验证码中间页') {
          return {
            url: window.location.href,
            cookie: document.cookie,
            title: document.title,
            success: false,
          }
        }
        let result = await getData()

        return {
          url: window.location.href,
          cookie: document.cookie,
          title: document.title,
          url: result.url,
          data: result.data,
          success: true,
        }
      },
      { requestPath, max_cursor, path, dimensions, num }
    )
  } catch (error) {
    console.log(error)
  }

  if (!getAppNamesRes) {
    console.log(`download ${path} ${chalk.red(` 出错了`)}`)
    return
  }

  console.log(`>>>>  ${getAppNamesRes.title}`)

  if (!getAppNamesRes.success) {
    console.log(`download ${path} ${chalk.red(` 被拦截，请更换token`)}`)
    return
  }

  if (getAppNamesRes.data) {
    let filepath = `${configPath.defaultDownloadDir}/video/${dimensions.title}`

    let video = getAppNamesRes.data.aweme_list.map(item => {
      if (item.images) {
        return {
          name: `${item.desc}${item.images.length}`,
          desc: item.desc,
          author: item.author,
          cover: item.video.cover.url_list[0],
          image: item.images.map(image => {
            let url = image.url_list[0].split('\u0026from=')[0].replace('\u0026', '&')
            let name = `${item.desc}___${item.author.nickname}___${item.create_time}_${image.uri}.webp`.replaceAll('/', '_')
            var isExist = fs.existsSync(filepath + '/' + name)
            return {
              name,
              url,
              isExist,
            }
          }),
        }
      }
      if (item.video) {
        let name = `${item.desc}___${item.author.nickname}___${item.create_time}.mp4`
        console.log(filepath + '/' + name)
        var isExist = fs.existsSync(filepath + '/' + name)
        return {
          name: name,
          desc: item.desc,
          author: item.author,
          cover: item.video.cover.url_list[0],
          isExist,
          video: item.video.bit_rate && item.video.bit_rate[0] && item.video.bit_rate[0].play_addr ? item.video.bit_rate[0].play_addr.url_list[2] : '',
        }
      }
    })

    option.data = option.data.concat(video)

    if (getAppNamesRes.data.has_more) {
      readFile({
        ...option,
        max_cursor: getAppNamesRes.data.max_cursor,
      })
    } else {
      callback(option.data)
      console.log(`download ` + chalk.green(` END`))
    }
  } else {
    console.log(`download ${path} ${chalk.grey(` 限流了`)}`)
    let time = setTimeout(() => {
      clearTimeout(time)
      readFile(option)
    }, 3000)
  }
}

export const downloadVideo = (dimensions, video, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let type = 'video'
      if (dimensions.type && dimensions.type === 'search') {
        type = 'search'
      }
      let filepath = `${configPath.defaultDownloadDir}/${type}/${dimensions.title}`
      if (video.video) {
        try {
          let isExist = fs.existsSync(filepath + '/' + video.name)
          if (isExist) {
            console.log(`${video.name} ` + chalk.green(` DOWNLOADED`))
          }
          await download(video.video, filepath, {
            filename: video.name,
          })
          console.log(`${video.name} ` + chalk.green(` SUCCESS`))
        } catch (error) {
          console.log(error)
          await download(video.video, filepath, {
            filename: video.name,
          })
        }
      }
      if (video.image) {
        let images = video.image
        for (let l = 0; l < images.length; l++) {
          try {
            let isExist = fs.existsSync(filepath + '/' + images[l].url)
            if (isExist) {
              console.log(`${images[l].url} ` + chalk.green(` DOWNLOADED`))
              continue
            }
            await download(images[l].url, filepath, {
              filename: images[l].name,
            })
            console.log(`${images[l].name} ` + chalk.green(` SUCCESS`))
          } catch (error) {
            await download(images[l].url, filepath, {
              filename: images[l].name,
            })
          }
        }
      }

      data.forEach(item => {
        if (item.video) {
          let isExist = fs.existsSync(filepath + '/' + item.name)
          item.isExist = isExist
        }
        if (video.image) {
          let isExist = fs.existsSync(filepath + '/' + video.image[0].url)
          item.isExist = isExist
        }
      })

      resolve(data)
    } catch (error) {
      resolve(error)
    }
  })
}

export const browserUtils = async (path, callback) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto(path)

      //console.log输出内容
      // page.on('console', msg => console.log('console.log:', msg.text()))
      //注入脚本
      const dimensions = await page.evaluate(async () => {
        //将js注入网页
        async function timeout(t) {
          return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), t)
          })
        }
        await timeout(1000)

        return {
          path: window.location.href,
          title: document.querySelector('.Nu66P_ba').innerText || document.title.split('的主页')[0],
          cookie: document.cookie,
        }
      })

      page.on('request', request => {
        console.log(request.url())
        // if (request.url() === constants.API) {
        //   request.respond({
        //     content: 'application/json',
        //     headers: { 'Access-Control-Allow-Origin': '*' },
        //     body: JSON.stringify(constants.biddersMock),
        //   })
        // } else {
        //   request.continue()
        // }
        request.continue()
      })

      // callback(await browser.close())

      resolve(dimensions)
    } catch (error) {
      reject(error)
    }
  })
}

export const getCookieString = () => {
  return `douyin.com; passport_csrf_token=96ebaa46244ac493393db9f89e293788; passport_csrf_token_default=96ebaa46244ac493393db9f89e293788; s_v_web_id=verify_layb01b4_K46VXZtj_D3Hq_4m4U_8GAb_RDyZQBhkDOL5; passport_assist_user=CkGGvjXz357efeXaf3Y_4_di8jyQ4aZH4RCjW6Daj2eygW91rJgdHkUYKMKmmXwmhGLtIitYjNSREny1GsTNbO5HkBpICjxwxXKlD89gHvGf1OhVT7ZEuQpj8H6Msf597ehOGNuJN4QE03PdmWvJM8tv-yyoqzWI5eidw8YWHYuWgJoQv6OkDRiJr9ZUIgED9OiQFQ%3D%3D; LOGIN_STATUS=1; __ac_nonce=063c3dcfa00bda47aee1a; __ac_signature=_02B4Z6wo00f01vVIoVQAAIDBYZ76Wu74Qeb1aKXAAN6fG6R8JZBWsPiMKIY9ZZ87Mtk.zkF.D8587Dk80rpRYEp5tZhiSLWhY30uIriizkx38CkKi8iYfm0VjT8l-g7FxaYekR4UtydExmPtf4; FOLLOW_NUMBER_YELLOW_POINT_INFO=%22MS4wLjABAAAAoPftHGJXkaLHwMfOiCocHXULhL8RLRI4Zk24VsXqGYSy8zHE2X2RI9FM2UmPyLOT%2F1673798400000%2F0%2F1673780839851%2F0%22; FOLLOW_LIVE_POINT_INFO=%22MS4wLjABAAAAoPftHGJXkaLHwMfOiCocHXULhL8RLRI4Zk24VsXqGYSy8zHE2X2RI9FM2UmPyLOT%2F1673798400000%2F0%2F1673781660009%2F0%22; strategyABtestKey=%221673781660.094%22; passport_fe_beating_status=true; home_can_add_dy_2_desktop=%221%22; tt_scid=y6sQc.0FYrGPKFzI6Omy1U3lqxo2FKsIU59gMB.jtgpf7RTpaLqbwuuTwK2WuTv6fa0f; download_guide=%221%2F20230115%22; msToken=yIkorREYIiwAdUEco71ZyKHKVaSojKv7OhPgCeOdhB5gL1bWFrvq2yBf0pZAsfFKyncJ6jkbQlfIIVSGxzwUgRV5xnwiFAj1URXA3zDUpK21kV6tOUIfBDeijCEQUsf6lw==`
}

export const getCookie = async () => {
  return await configData.readCookie()
  // return {
  //   // url: 'https://www.douyin.com',
  //   ttwid: '1%7CCRE9AfUrBeRcdycCfH7YWiNK9IMak9Yf_pmCgdQwEVo%7C1663168437%7C9a831225a6ba9808e0c5e4ca769d4fe21081f06acd5e49b5aff50bb70ff8296d',
  //   d_ticket: '9dabfe781d06ad5c1ed5b33c95977393b7b59',
  //   passport_csrf_token: '96ebaa46244ac493393db9f89e293788',
  //   passport_csrf_token_default: '96ebaa46244ac493393db9f89e293788',
  //   s_v_web_id: 'verify_layb01b4_K46VXZtj_D3Hq_4m4U_8GAb_RDyZQBhkDOL5',
  //   SEARCH_RESULT_LIST_TYPE: '%22single%22',
  //   download_guide: '%223%2F20221219%22',
  //   passport_assist_user: 'CkGGvjXz357efeXaf3Y_4_di8jyQ4aZH4RCjW6Daj2eygW91rJgdHkUYKMKmmXwmhGLtIitYjNSREny1GsTNbO5HkBpICjxwxXKlD89gHvGf1OhVT7ZEuQpj8H6Msf597ehOGNuJN4QE03PdmWvJM8tv-yyoqzWI5eidw8YWHYuWgJoQv6OkDRiJr9ZUIgED9OiQFQ%3D%3D',
  //   n_mh: 'MnyjfF8aUE9COHknO4-8uUnfIH-vjI_GRrYEX8PerY8',
  //   sso_uid_tt: 'c5fe8404f0de87bdd0a70782e1d11083',
  //   sso_uid_tt_ss: 'c5fe8404f0de87bdd0a70782e1d11083',
  //   toutiao_sso_user: 'dae4bab13f82c7d7fe2903467498d3d9',
  //   toutiao_sso_user_ss: 'dae4bab13f82c7d7fe2903467498d3d9',
  //   sid_ucp_sso_v1: '1.0.0-KGFjM2NiMTZmMzcyZTAyOGVlOGFhY2FhNzUyMzRmZjU4YTczYTEzNjAKHwiuibHSsvTLBBDBkoGdBhjvMSAMMMnJyvkFOAZA9AcaAmxxIiBkYWU0YmFiMTNmODJjN2Q3ZmUyOTAzNDY3NDk4ZDNkOQ',
  //   ssid_ucp_sso_v1: '1.0.0-KGFjM2NiMTZmMzcyZTAyOGVlOGFhY2FhNzUyMzRmZjU4YTczYTEzNjAKHwiuibHSsvTLBBDBkoGdBhjvMSAMMMnJyvkFOAZA9AcaAmxxIiBkYWU0YmFiMTNmODJjN2Q3ZmUyOTAzNDY3NDk4ZDNkOQ',
  //   odin_tt: '4a752e5e1104cd78c58b905bde9b0da873465e5cee2540929db1df464238f03c4acb552c5547d4916d0f72d34bf9684713f0af256067c48becf4290e0896bf39',
  //   passport_auth_status: 'd0cd5960ce2a43f922762ac62344c37c%2C',
  //   passport_auth_status_ss: 'd0cd5960ce2a43f922762ac62344c37c%2C',
  //   uid_tt: '620189c9e01a7cc34678d5d06c47ef19',
  //   uid_tt_ss: '620189c9e01a7cc34678d5d06c47ef19',
  //   sid_tt: '07f1d09a0a45baa8b6867045eec31a8d',
  //   sessionid: '07f1d09a0a45baa8b6867045eec31a8d',
  //   sessionid_ss: '07f1d09a0a45baa8b6867045eec31a8d',
  //   LOGIN_STATUS: '1',
  //   sid_guard: '07f1d09a0a45baa8b6867045eec31a8d%7C1671448901%7C5183996%7CFri%2C+17-Feb-2023+11%3A21%3A37+GMT',
  //   sid_ucp_v1: '1.0.0-KGUwNzM0MjVkZTY5MjYzMmI0ZmRiY2MwODNiN2I1MzJiMTBkYmUzMGMKGQiuibHSsvTLBBDFkoGdBhjvMSAMOAZA9AcaAmxxIiAwN2YxZDA5YTBhNDViYWE4YjY4NjcwNDVlZWMzMWE4ZA',
  //   ssid_ucp_v1: '1.0.0-KGUwNzM0MjVkZTY5MjYzMmI0ZmRiY2MwODNiN2I1MzJiMTBkYmUzMGMKGQiuibHSsvTLBBDFkoGdBhjvMSAMOAZA9AcaAmxxIiAwN2YxZDA5YTBhNDViYWE4YjY4NjcwNDVlZWMzMWE4ZA',
  //   csrf_session_id: '473973489729256a085c1ee15eeb3869',
  //   live_can_add_dy_2_desktop: '%220%22',
  //   _tea_utm_cache_2018: 'undefined',
  //   FOLLOW_NUMBER_YELLOW_POINT_INFO: '%22MS4wLjABAAAAoPftHGJXkaLHwMfOiCocHXULhL8RLRI4Zk24VsXqGYSy8zHE2X2RI9FM2UmPyLOT%2F1671984000000%2F0%2F0%2F1671917572744%22',
  //   msToken: 'leRqpT8O_SCyMU2JWkTZMw43WZgZJkVLg4bcsLqB_t-LH-zFenQfP669W2C_ywg9TD9RRPiWKH8-K8hlFN6UdWezFRNvHmGsqgt7DAOe76QPY14BHONSnKIR3Vo3R95M',
  //   tt_scid: 'mYtQscJgpKjS0RX9-HTtmR2HomH01.o4zUU4d7kO-0GlMaSJmCRisS4M2s5fMAm-b570',
  //   msToken: 'eTfmSFEqEV3G3BN3wYTCVPzg7MJgNKozvkBmJJlysWpcTxGH_ysx-ABbenwoKNpHf6Fs67XWRhKmN5s_uiUaTM8fQNPzHXTNqZZHX1efEp1TCnmVhWJcRe-yySu5pNJ_',
  //   __ac_nonce: '063a8183a00e3b82e6675',
  //   __ac_signature: '_02B4Z6wo00f01Gh.F9QAAIDD.KlM2TuK8sBoXxNAAHm.YwvUOayX-rs3fcGCPyS9Ypi8760WQSDUFBovr1WXg6I3pKK1RiGYFdz2f0CtjQ9tJJRKjRV.NodGvFkq-kN2n1f3U1c0eDBTCnc3fe',
  //   strategyABtestKey: '%221671960635.712%22',
  //   FOLLOW_LIVE_POINT_INFO: '%22MS4wLjABAAAAoPftHGJXkaLHwMfOiCocHXULhL8RLRI4Zk24VsXqGYSy8zHE2X2RI9FM2UmPyLOT%2F1671984000000%2F0%2F1671960636068%2F0%22',
  //   home_can_add_dy_2_desktop: '%221%22',
  //   passport_fe_beating_status: 'true',
  //   domain: 'douyin.com',
  // }
}

export const setCookie = async page => {
  return new Promise(async (resolve, reject) => {
    let cookie = getCookie()

    let cookieAry = []

    for (let attr in cookie) {
      await page.setCookie({
        name: attr,
        value: cookie[attr],
        domain: 'www.douyin.com',
        path: '/',
      })
    }
    resolve()
  })
}
