import * as request from '../api/request'

// 生产环境
export const baseURL = ''

// 开发环境

export const getImgUrl = url => baseURL + url

export const requstPromise = res => {
  return new Promise((resolve, reject) => {
    console.log(res)
    if (res && res.code === 200) {
      resolve(res)
    } else {
      reject(res)
    }
  }).catch(error => {
    console.log(error)
  })
}

export const hideSpinner = () => {
  var spinner = document.getElementById('spinner')
  spinner.style.display = 'none'
}

export const share = (openid, dispatch) => {
  // request.share({ openid: openid }).then(res => {
  //   getUserInfo(dispatch, { openid })
  //   alert(res.message)
  // })
}

export const setSherd = (openid, dispatch) => {
  let url = window.location.href.split('#')[0]
}

export const verificationCode = option => {
  request.verificationCode(option).then(res => {
    console.log(res)
  })
}
