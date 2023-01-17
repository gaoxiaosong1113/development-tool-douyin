import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useContextSelector } from 'use-context-selector'

import { HomeOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, DownloadOutlined, StopOutlined } from '@ant-design/icons'
import { Avatar, Card, Breadcrumb, Space, Col, Row, List, Input, message, Spin } from 'antd'

import * as request from '../api/request'

import AppContext from '../utils/appContext'
import { useRef } from 'react'
import { async } from 'rxjs'

// import * as ipc from '../ipc'
const { Meta } = Card

function UpdatePage() {
  const navigate = useNavigate()
  const params = useParams()

  const [data, setData] = useState([])
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(null)
  const loadingRef = useRef(false)

  const { store, appLoading, setAppLoading } = useContextSelector(AppContext, value => ({
    store: value.store,
    appLoading: value.loading,
    setAppLoading: value.setLoading,
  }))

  useEffect(() => {
    if (loadingRef.current) return
    if (store.length === 0) return
    loadingRef.current = true
    setAppLoading(true)
    window.app.getUserData({
      path: store[params.index].path,
    })
    setUserData(store[params.index])
  }, [params.index, store])

  useEffect(() => {
    window.app.onUserData((event, value) => {
      setData(value)
      setAppLoading(false)
      loadingRef.current = false
    })
  }, [])

  const handleDown = async item => {
    setLoading(item.name)
    let nextData = await window.app.download({
      dimensions: userData,
      current: item,
      data,
    })
    setData(nextData)
    setLoading(null)
  }

  return (
    <div className='content'>
      <Breadcrumb>
        <Breadcrumb.Item href='/'>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>{userData?.title}</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <List
        grid={{
          gutter: 0,
          xs: 2,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
          column: 4,
        }}
        dataSource={data}
        renderItem={item => (
          <List.Item style={{ padding: 16, marginBottom: 0 }}>
            <Card
              style={{ width: '100%' }}
              cover={<img alt={item.desc} src={item.cover} />}
              actions={[
                item.isExist ? (
                  <StopOutlined disabled={true} />
                ) : (
                  <Spin spinning={loading && item.name === loading}>
                    <DownloadOutlined key='download' onClick={() => handleDown(item)} />
                  </Spin>
                ),
              ]}>
              <Meta title={item.desc} description={item.image ? '图片' : '视频'} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default UpdatePage
