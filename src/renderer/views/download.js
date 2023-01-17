import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { useContextSelector } from 'use-context-selector'

import { HomeOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, DownloadOutlined, StopOutlined } from '@ant-design/icons'
import { Avatar, Card, Breadcrumb, Space, Col, Row, List, Input, message, Spin } from 'antd'

import * as request from '../api/request'

import AppContext from '../utils/appContext'

// import * as ipc from '../ipc'

const { Search } = Input
const { Meta } = Card

function DownloadPage() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(null)

  const { downloadStore, downloadUserStore, setDownloadStore, setAppLoading } = useContextSelector(AppContext, value => ({
    downloadStore: value.downloadStore,
    setAppLoading: value.setLoading,
    downloadUserStore: value.downloadUserStore,
    setDownloadStore: value.setDownloadStore,
  }))

  const onSearch = async value => {
    setAppLoading(true)
    window.app.getUserData({
      path: value,
    })
  }

  const handleDown = async item => {
    return new Promise(async () => {
      setLoading(item.name)
      let data = await window.app.download({
        dimensions: downloadUserStore,
        current: item,
        data: downloadStore,
      })
      setDownloadStore(data)
      setLoading(null)
    })
  }

  const handleDownAll = async () => {
    for (let i = 0; i < downloadStore.length; i++) {
      await handleDown(downloadStore[i])
    }
  }

  return (
    <div className='content'>
      <Row>
        <Col span={12} offset={6}>
          <Search
            placeholder='请输入分享链接'
            allowClear
            enterButton='搜索'
            size='large'
            suffix={
              <DownloadOutlined
                style={{
                  fontSize: 16,
                  color: '#1890ff',
                }}
                onClick={handleDownAll}
              />
            }
            onSearch={onSearch}
          />
        </Col>
      </Row>

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
        dataSource={downloadStore}
        renderItem={item => {
          let isExist = item.isExist
          if (item.image) {
            isExist = item.image[0].isExist
          }
          return (
            <List.Item style={{ padding: 16, marginBottom: 0 }}>
              <Card
                style={{ width: '100%' }}
                cover={<img alt={item.desc} src={item.cover} />}
                actions={[
                  isExist ? (
                    <StopOutlined />
                  ) : (
                    <Spin spinning={loading && item.name === loading}>
                      <DownloadOutlined key='download' onClick={() => handleDown(item)} />
                    </Spin>
                  ),
                ]}>
                <Meta title={item.name} description={item.image ? '图片' : '视频'} />
              </Card>
            </List.Item>
          )
        }}
      />
    </div>
  )
}

export default DownloadPage
