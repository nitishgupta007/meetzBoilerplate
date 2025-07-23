import React from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import {
  Button,
  Avatar,
  Dropdown,
  Menu as AntMenu,
  Space,
  theme,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import SearchUserBox from './userSearch';

const HeaderBar = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.user);

  const menu = (
    <AntMenu>
      <AntMenu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </AntMenu.Item>
      <AntMenu.Item key="change-pic" icon={<PictureOutlined />}>
        Change Picture
      </AntMenu.Item>
      <AntMenu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </AntMenu.Item>
      <AntMenu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={() => {
          dispatch(logout());
          navigate('/');
        }}
      >
        Logout
      </AntMenu.Item>
    </AntMenu>
  );

  return (
    <div style={{ padding: '0 16px', background: colorBgContainer }}>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <SearchUserBox />
        </div>
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <Space className="cursor-pointer">
            <Avatar style={{ backgroundColor: '#1890ff' }}>
              {username?.username?.substring(0, 2).toUpperCase() || 'U'}
            </Avatar>
          </Space>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderBar;
