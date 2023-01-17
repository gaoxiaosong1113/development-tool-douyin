import api from './api'
// import { appid, appsecret, requstPromise, getCode } from '../utils/utils'

// 获取微信授权
export const auth = option => api.post('/prod-api/wx/user/auth', option)

// 0101-客户注册接口
export const register = option => api.post('/prod-api/wx/customer/register', option)

// 0102-个人信息查询接口
export const customerInfo = option => api.post('/prod-api/wx/customer/info/', option)

// 0103-个人信息修改接口
export const customerChange = option => api.post('/prod-api/wx/customer/chanage', option)

// 0104-获取登录用户信息
export const selectByOtherUser = option => api.post('/prod-api/wx/user/selectByOtherUser', option)

// 0201-报盘明细接口
export const containerInfo = option => api.post(`/prod-api/wx/container/info`, option)

// 0301-购物车列表接口
export const shoppingTrolleyList = option => api.post(`/prod-api/wx/shopping/trolley/list`, option)

// 0302-添加购物车接口
export const shoppingTrolleyAdd = option => api.post(`/prod-api/wx/shopping/trolley/add`, option)

// 0303-删除购物车接口
export const shoppingTrolleyDel = option => api.post(`/prod-api/wx/shopping/trolley/del`, option)

// 0401-提交订单接口
export const saleOrderAdd = option => api.post(`/prod-api/wx/sale/order/add`, option)

// 0402-订单列表接口
export const saleOrderList = option => api.post(`/prod-api/wx/sale/order/list`, option)

// 0403-我的订单明细
export const saleOrderDetail = option => api.post(`/prod-api/wx/sale/order/detail`, option)

// 0501-获取短信验证码
export const verificationCode = option => api.post('/prod-api/wx/SMS/verification/code', option)

// 9901-热盘预告(未完成)
// export const a = option => api.post('', option)
