import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { useContextSelector } from 'use-context-selector'

import { HomeOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { Avatar, Card, Breadcrumb, Space, Col, Row, List, message, Input } from 'antd'
import VirtualList from 'rc-virtual-list'

import * as request from '../api/request'

import AppContext from '../utils/appContext'
import { useMemo } from 'react'

const { Meta } = Card
const { Search } = Input

function Index() {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')

  const { store } = useContextSelector(AppContext, value => ({
    store: value.store,
    setLoading: value.setLoading,
  }))

  const handleUpdate = index => {
    // setLoading(true)

    navigate(`/update/${index}`)
  }

  const data = useMemo(() => {
    if (!search) return store

    return store.filter(item => item.title.indexOf(search) !== -1)
  }, [search, store])

  const onSearch = value => setSearch(value)

  return (
    <div className='content'>
      {/* <Space direction='vertical' size='large'> */}
      <Breadcrumb>
        <Breadcrumb.Item href='/'>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>首页</span>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        <Col span={12} offset={6}>
          <Search placeholder='请输入关键字' allowClear enterButton='Search' size='large' onSearch={onSearch} />
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
        }}
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item style={{ padding: 16, marginBottom: 0 }}>
            <Card style={{ width: '100%' }} actions={[<SettingOutlined key='setting' onClick={() => handleUpdate(index)} />, <EditOutlined key='edit' />, <EllipsisOutlined key='ellipsis' />]}>
              <Meta avatar={<Avatar size={56} src={item.avatar || ''} />} title={item.title} />
            </Card>
          </List.Item>
        )}
      />
      {/* </Space> */}
    </div>
  )
}

export default Index
