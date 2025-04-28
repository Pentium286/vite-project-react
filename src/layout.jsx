import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import { Outlet } from "react-router";
import Navigation from "./components/navigation/index";

const { Header, Content } = Layout;

const LayoutPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={[
            {
              key: 1,
              label: "顶部菜单1",
            },
            {
              key: 2,
              label: "顶部菜单2",
            },
            {
              key: 3,
              label: "顶部菜单3",
            },
          ]}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Navigation />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
            style={{ margin: '16px 0' }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;