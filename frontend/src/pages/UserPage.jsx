import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Avatar, Typography, Card, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFriends, sendRequest, fetchFriendsRequest, acceptRequest } from '../features/friend/friendSlice';
import SearchUserBox from '../components/userSearch';

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;


const UserPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);
  const friendRequest = useSelector((state) => state.friend.friendRequest);

  useEffect(() => {
    dispatch(fetchFriends());
    dispatch(fetchFriendsRequest());
  }, [dispatch]);

  const handleSendRequest = (userId) => {
    dispatch(sendRequest(userId));
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="text-white">💖 Find Your Vibe</div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <SearchUserBox setUserList={setUserList} />
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
          <Row gutter={[24, 24]} className="mt-6">
            {userList.map((user) => (
              <Col xs={24} sm={12} md={8} lg={6} key={user.id}>
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
                      <Text strong className="text-lg">
                        {user.username}
                      </Text>
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

          <Row>
            {friendRequest && friendRequest.map((friend) =>
              <div>
                {friend.sender.username}
                <Button onClick={() => dispatch(acceptRequest(friend.senderId))}>Accept</Button>
              </div>
            )}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserPage;
