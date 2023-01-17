import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { HashRouter, useNavigate, useLocation, Route, Routes } from 'react-router-dom'

import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, DownloadOutlined, SearchOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons'

import { ConfigProvider, Layout, Menu, theme, Breadcrumb, Spin } from 'antd'
import zhCN from 'antd/locale/zh_CN'

import AppContext from './utils/appContext'
import { getUrl } from './utils/utils'

import Home from './views/home'
import Download from './views/download'
import Update from './views/update'
import Search from './views/search'
import Settings from './views/settings'

import 'antd/dist/reset.css'
import './static/css/style.scss'

const { Header, Sider, Content } = Layout

function App(props) {
  const navigate = useNavigate()
  const location = useLocation()

  const [store, setStore] = useState([])
  const [downloadUserStore, setDownloadUserStore] = useState(null)
  const [downloadStore, setDownloadStore] = useState([])
  const [searchStore, setSearchStore] = useState([])

  const [collapsed, setCollapsed] = useState(false)
  const [loading, setLoading] = useState(false)

  const getConfig = async () => {
    setLoading(true)
    let data = await window.app.getConfig()
    setStore(data)
    setLoading(false)
  }

  useEffect(() => {
    getConfig()
  }, [])

  useEffect(() => {
    window.app.onUserData((event, value) => {
      console.log(value)
      setDownloadStore(value)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    window.app.onUserConfig((event, value) => {
      console.log(value)
      setDownloadUserStore(value)
    })
  }, [])

  useEffect(() => {
    window.app.onSearchData((event, value) => {
      setSearchStore(value)
      setLoading(false)
    })
  }, [])

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const handleClick = menu => {
    navigate(menu.key)
    if (menu.key === '/') {
      getConfig()
    }
    setLoading(false)
    setDownloadUserStore([])
    setDownloadStore([])
    setSearchStore([])
  }

  return (
    <ConfigProvider locale={zhCN}>
      <AppContext.Provider value={{ loading, store, downloadStore, downloadUserStore, searchStore, setSearchStore, setDownloadStore, setDownloadUserStore, setLoading }}>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: colorBgContainer }}>
            <div className='logo' />
            <Menu
              mode='inline'
              defaultSelectedKeys={[location.pathname]}
              onClick={handleClick}
              items={[
                {
                  key: '/',
                  icon: <HomeOutlined />,
                  label: '首页',
                },
                {
                  key: '/download',
                  icon: <DownloadOutlined />,
                  label: '下载',
                },
                // {
                //   key: '/update',
                //   icon: <UploadOutlined />,
                //   label: '更新',
                // },
                {
                  key: '/search',
                  icon: <SearchOutlined />,
                  label: '搜索',
                },
                {
                  key: '/settings',
                  icon: <SettingOutlined />,
                  label: '设置',
                },
              ]}
            />
          </Sider>
          <Layout
            className='site-layout'
            style={{
              background: colorBgContainer,
            }}>
            {/* <Header style={{ padding: 0, background: colorBgContainer }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header> */}
            <div className='content-warp'>
              <Spin tip='Loading' size='small' spinning={loading}>
                <Content>
                  <Routes>
                    <Route path='/' element={<Home />} desc='首页' />
                    <Route path='/download' element={<Download />} desc='下载' />
                    <Route path='/update' element={<Update />} desc='更新' />
                    <Route path='/update/:index' element={<Update />} desc='更新' />
                    <Route path='/search' element={<Search />} desc='搜索' />
                    <Route path='/settings' element={<Settings />} desc='设置' />
                  </Routes>
                </Content>
              </Spin>
            </div>
          </Layout>
        </Layout>
      </AppContext.Provider>
    </ConfigProvider>
  )
}

export default App
