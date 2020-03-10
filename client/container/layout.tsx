
import React from 'react'
import { Switch, Route, Redirect, useHistory, Link } from 'react-router-dom'
import Apps from './apps'
import './layout.less'
import { Layout, Menu } from 'antd';
import { DashboardOutlined, MonitorOutlined, DeploymentUnitOutlined } from '@ant-design/icons';

const { Sider, Header, Content, Footer } = Layout
const { SubMenu } = Menu

export default function () {
  const history = useHistory()
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Sider className="layout-side">
        <div className="logo">
          <a href="#">
            <h1>FALCON</h1>
          </a>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['/apps']} selectedKeys={[history.location.pathname]} mode="inline">
          <Menu.Item key="/apps">
            <span>
              <DashboardOutlined />
              <span>
                <Link to="/apps">应用</Link>
              </span>
            </span>
          </Menu.Item>
          <SubMenu
            key="sub2"
            title={
              <span>
                <MonitorOutlined />
                <span>监控</span>
              </span>
            }
          >
            <Menu.Item key="6">异常监控</Menu.Item>
            <Menu.Item key="8">性能监控</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <DeploymentUnitOutlined />
                <span>分析</span>
              </span>
            }
          >
            <Menu.Item key="6">转储文件分析</Menu.Item>
            <Menu.Item key="8">应用快照分析</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header className="layout-header-background">Header</Header>
        <Content>
          <Switch>
            <Route path="/apps">
              <Apps></Apps>
            </Route>
            <Redirect to="/apps"></Redirect>
          </Switch>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  )
}