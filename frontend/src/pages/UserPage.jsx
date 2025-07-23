import React, { useState, useEffect } from 'react';
import {
  UserOutlined
} from '@ant-design/icons';
import HeaderBar from '../components/HeaderBar';
import { Button, Layout, Menu, theme, Avatar, Typography, Card, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFriends, sendRequest, fetchFriendsRequest } from '../features/friend/friendSlice';
import FriendSidebar from '../components/FriendSidebar';
import PostInputBox from '../components/PostInputBox';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const UserPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const username = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    dispatch(fetchFriends());
    dispatch(fetchFriendsRequest());
  }, [dispatch]);

  const handleSendRequest = (userId) => {
    dispatch(sendRequest(userId));
  };
  return (
    <Layout style={{ height: 'calc(100vh - 0px)' }}>
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
        <Header style={{ padding: '0 16px', background: colorBgContainer }}>
          <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} setUserList={setUserList} />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Main Layout Grid */}
          <Row gutter={24}>
            {/* Center Main Content */}
            <Col xs={24} md={16} lg={17}>
              <Row gutter={[24, 24]}>
                <div style={{width: '100%', justifyItems: 'center'}}>
                  <PostInputBox username="Nitish" avatarUrl="https://your-avatar-url.jpg" />
                </div>
                {userList.map((user) => (
                  <Col xs={24} sm={12} md={12} lg={12} key={user.id}>
                    <Card
                      hoverable
                      className="rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
                      cover={
                        <img
                          alt="profile"
                          src={user?.profilePic || 'https://via.placeholder.com/300x200.png?text=User'}
                          className="h-48 w-full object-cover rounded-t-2xl"
                        />
                      }
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <Avatar size="large">{user.username.charAt(0).toUpperCase()}</Avatar>
                        <div>
                          <Text strong className="text-lg">{user.username}</Text>
                          <br />
                          <Text type="secondary">{user.age ? `${user.age} yrs` : 'Age not set'}</Text>
                        </div>
                      </div>

                      <Text className="block mb-3">
                        {user.bio || 'Looking for someone to vibe with ✨'}
                      </Text>

                      <Button
                        type="primary"
                        block
                        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold"
                        onClick={() => handleSendRequest(user.id)}
                      >
                        💌 Send Request
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
            <FriendSidebar />
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserPage;
