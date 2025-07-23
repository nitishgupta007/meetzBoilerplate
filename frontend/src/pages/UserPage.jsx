// pages/UserPage.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Card, Avatar, Row, Col, Button } from 'antd';
import PostInputBox from '../components/PostInputBox';
import FriendSidebar from '../components/FriendSidebar';
import { fetchFriends, fetchFriendsRequest, sendRequest } from '../features/friend/friendSlice';

const { Text } = Typography;

const UserPage = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.user);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    dispatch(fetchFriends());
    dispatch(fetchFriendsRequest());
  }, [dispatch]);

  const handleSendRequest = (userId) => {
    dispatch(sendRequest(userId));
  };

  return (
    <Row gutter={24}>
      {/* Center Content */}
      <Col xs={24} md={16} lg={17}>
        <div className="mb-6">
          <PostInputBox username={username?.username || 'User'} avatarUrl="https://your-avatar-url.jpg" />
        </div>
        <Row gutter={[24, 24]}>
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

      {/* Right Sidebar */}
      <FriendSidebar />
    </Row>
  );
};

export default UserPage;
