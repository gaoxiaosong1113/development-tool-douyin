import axios from 'axios'

function handleQueryStr(option) {
  if (Object.prototype.toString.call(option) !== '[object Object]') return ''
  let str = '?'
  for (let attr in option) {
    str += `${attr}=${option[attr]}&`
  }
  return str.slice(0, -1)
}

const instance = axios.create()

const api = {
  async get(url, data) {
    let res = await instance.get(url, {
      params: {
        ...data,
      },
    })
    return new Promise((resolve, reject) => {
      if (res.data && res.data.code === 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(error => {
      console.log(error)
    })
  },
  async post(url, data) {
    let query = data instanceof Object ? data : {}
    let res = await instance.post(url + handleQueryStr(data), query)
    return new Promise((resolve, reject) => {
      if (res.data && res.data.code === 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    })
  },
}

instance.interceptors.request.use(
  request => {
    // 在发送请求之前做些什么
    // console.log(`发起请求：path:${request.url}，baseURL:${request.baseURL}`)
    // console.log(`openid：${store.state.openId}`)
    // if (request.url != 'api/wx/getAuth') {
    //     let openid = store.state.openid
    //     console.log(`请求前添加openid：${store.state.openid}`)
    // }
    request.headers['Content-type'] = 'application/json'

    return request
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    // 在发送请求之前做些什么
    // console.log(`发起请求：path:${request.url}，baseURL:${request.baseURL}`)
    // console.log(`openid：${store.state.openId}`)
    // if (request.url != 'api/wx/getAuth') {
    //     let openid = store.state.openid
    //     console.log(`请求前添加openid：${store.state.openid}`)
    // }
    console.log(response)

    if (response.data.code !== 200) {
      // Toast.show(response.data.msg, 1)
    }

    return response
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default api
