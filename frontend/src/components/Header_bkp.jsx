import { Layout, Menu, Button, Switch, Row, Col, Space, Drawer } from 'antd';
import {
  BulbOutlined,
  BulbFilled,
  MenuOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toggleMode } from '../features/theme/themeSlice';

const { Header } = Layout;

export default function HeaderComponent({ setAuthVisible }) {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === 'dark';
  const [drawerVisible, setDrawerVisible] = useState(false);

  const navItems = ['Products', 'Learn', 'Safety', 'Support', 'Download'];

  return (
    <>
      <Header style={{ padding: '0 16px' }}>
        <Row align="middle" justify="space-between" wrap>
          <Col>
            <div className="text-xl font-bold">
              <span className="text-red-500">🔥</span>{' '}
              <span className="text-white">Meetz</span>
            </div>
          </Col>

          {/* Desktop Menu */}
          <Col className="hidden md:block" flex="auto">
            <Menu
              mode="horizontal"
              theme={isDark ? 'dark' : 'dark'}
              className="bg-transparent justify-center"
              disabledOverflow
            >
              {navItems.map((item, index) => (
                <Menu.Item key={index}>{item}</Menu.Item>
              ))}
            </Menu>
          </Col>
          {/* Right Actions */}
          <Col className="hidden md:flex">
            <Space size="middle" wrap>
              <Switch
                checked={isDark}
                onChange={() => dispatch(toggleMode())}
                checkedChildren={<BulbFilled />}
                unCheckedChildren={<BulbOutlined />}
              />
              <Button type="primary" shape="round" onClick={() => setAuthVisible(true)}>
                Log in
              </Button>
            </Space>
          </Col>


          {/* Burger Icon for Mobile */}
          <Col className="md:hidden">
            <Button
              icon={<MenuOutlined />}
              type="text"
              onClick={() => setDrawerVisible(true)}
              style={{ color: 'white' }}
            />
          </Col>
        </Row>
      </Header>

      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="vertical"
          theme={isDark ? 'dark' : 'light'}
          selectable={false}
          onClick={() => setDrawerVisible(false)}
          className="border-b border-gray-200"
        >
          {navItems.map((item, index) => (
            <Menu.Item key={index}>{item}</Menu.Item>
          ))}
        </Menu>

        {/* Mobile-only controls */}
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Dark Mode</span>
            <Switch
              checked={isDark}
              onChange={() => dispatch(toggleMode())}
              checkedChildren={<BulbFilled />}
              unCheckedChildren={<BulbOutlined />}
            />
          </div>
          <Button type="primary" shape="round" onClick={() => setAuthVisible(true)}>
            Log in
          </Button>
        </div>
      </Drawer>

    </>
  );
}
