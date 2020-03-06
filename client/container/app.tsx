import React from 'react'
import { Layout, Menu } from 'antd';
import './app.less'
import { DashboardOutlined, MonitorOutlined, DeploymentUnitOutlined } from '@ant-design/icons'

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default function() {
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Sider className="layout-side">
        <div className="logo">
          <a href="#">
            <h1>FALCON</h1>
          </a>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="3">
            <span>
              <DashboardOutlined />
              <span>应用概览</span>
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
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  )
}