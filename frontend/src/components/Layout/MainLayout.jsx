// components/MainLayout.jsx
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import HeaderBar from '../HeaderBar';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children, setUserList }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="text-white p-4 text-lg font-bold">💖 Find Your Vibe</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Dashboard',
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: '0 16px', background: '#fff' }}>
          <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} setUserList={setUserList} />
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: '#fff',
            borderRadius: '10px',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
