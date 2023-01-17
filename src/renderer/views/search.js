import React, { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useContextSelector } from 'use-context-selector'

import { HomeOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, DownloadOutlined, StopOutlined } from '@ant-design/icons'
import { Avatar, Card, Breadcrumb, Space, Col, Row, List, Input, message, Spin } from 'antd'

import * as request from '../api/request'

import AppContext from '../utils/appContext'

const { Search } = Input
const { Meta } = Card

function SearchPage() {
  const navigate = useNavigate()

  const searchRef = useRef('')
  const [loading, setLoading] = useState(null)

  const { searchStore, setSearchStore, appLoading, setAppLoading } = useContextSelector(AppContext, value => ({
    searchStore: value.searchStore,
    setSearchStore: value.setSearchStore,
    appLoading: value.loading,
    setAppLoading: value.setLoading,
  }))

  const onSearch = value => {
    setAppLoading(true)
    window.app.getSearchData({
      path: value,
    })
  }

  const handleDown = async item => {
    console.log(item)
    setLoading(item.name)
    let data = await window.app.download({
      dimensions: {
        type: 'search',
        title: searchRef.current.input.value,
      },
      current: item,
      data: searchStore,
    })
    setSearchStore(data)
    setLoading(null)
    console.log(data)
  }

  return (
    <div className='content'>
      <Row>
        <Col span={12} offset={6}>
          <Search placeholder='请输入关键字' ref={searchRef} allowClear enterButton='搜索' size='large' onSearch={onSearch} />
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
        dataSource={searchStore}
        renderItem={item => {
          let isExist = item.isExist
          if (item.image) {
            isExist = item.image[0].isExist
          }
          return (
            <List.Item style={{ padding: 16, marginBottom: 0 }}>
              <Card
                style={{ width: '100%' }}
                cover={<img alt='example' src={item.cover} />}
                actions={[
                  isExist ? (
                    <StopOutlined />
                  ) : (
                    <Spin spinning={loading && item.name === loading}>
                      <DownloadOutlined key='download' onClick={() => handleDown(item)} />
                    </Spin>
                  ),
                ]}>
                <Meta title={item.esc} description='This is the description' />
              </Card>
            </List.Item>
          )
        }}
      />
    </div>
  )
}

export default SearchPage
