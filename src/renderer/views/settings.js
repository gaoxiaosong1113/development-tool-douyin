import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { useContextSelector } from 'use-context-selector'

import { HomeOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons'
import { Avatar, Card, Breadcrumb, Space, Col, Row, List, message, Upload, Button, Input } from 'antd'
import VirtualList from 'rc-virtual-list'

import * as request from '../api/request'

import AppContext from '../utils/appContext'
import { useRef } from 'react'

function SettingsPage() {
  const navigate = useNavigate()

  const cookieRef = useRef('')

  const {} = useContextSelector(AppContext, value => ({}))

  const props = {
    showUploadList: false,
    onChange({ file }) {
      console.log(file.originFileObj.path)
      window.app.setConfig({
        path: file.originFileObj.path,
      })
    },
  }

  function getCookie(cookie, key) {
    let obj = {}
    if (!cookie.length < 0) {
      return obj
    }
    var cookies = cookie.split('GMT,')
    for (let i = 0; i < cookies.length; i++) {
      let cookieObj = {}
      let keyName = ''

      let cookieItem = (cookies[i] += i === cookies.length - 1 ? '' : 'GMT')
      let cookieItems = cookieItem.split('; ')
      for (let l = 0; l < cookieItems.length; l++) {
        let item = cookieItems[l]
        let itemObj = item.split('=') // 再次切割
        if (l == 0) {
          keyName = itemObj[0]
          cookieObj.value = itemObj[1]
        } else {
          cookieObj[itemObj[0]] = itemObj[1]
        }
      }

      obj[keyName] = cookieObj
    }

    return obj
  }

  const handleCookie = () => {
    let cookie = getCookie(cookieRef.current.input.value)?.['douyin.com']
    window.app.setCookie(cookie || {})
    console.log(cookie)
  }

  return (
    <div className='content'>
      <Breadcrumb>
        <Breadcrumb.Item href='/'>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>设置</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className='content-box'>
        <Upload {...props} maxCount={1}>
          <Button icon={<UploadOutlined />}>导入配置</Button>
        </Upload>
        <div style={{ height: 30 }}></div>
        <Input.Group compact>
          <Input style={{ width: 'calc(100% - 200px)' }} ref={cookieRef} defaultValue='' />
          <Button type='primary' onClick={handleCookie}>
            设置cookie
          </Button>
        </Input.Group>
      </div>
    </div>
  )
}

export default SettingsPage
