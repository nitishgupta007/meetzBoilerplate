import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriends, sendRequest } from '../features/friend/friendSlice';
import SearchUserBox from '../components/userSearch';
import { Avatar, Button, Typography, Card, Row, Col, Divider } from 'antd';

const { Text, Title } = Typography;

export default function UserPage() {
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);

  const user = useSelector((state) => state.auth.user); // logged-in user info
  const friends = useSelector((state) => state.friends.list); // friends list from Redux

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  const handleSendRequest = (userId) => {
    dispatch(sendRequest(userId));
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar size={64} src={user?.profilePic || ''}>
            {user?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <Title level={4}>{user?.username || 'Welcome'}</Title>
            <Text>{user?.bio || 'Excited to find a connection 💕'}</Text>
          </div>
        </div>
        <div>
          <Button type="primary" className="bg-pink-500 hover:bg-pink-600 text-white">
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <SearchUserBox setUserList={setUserList} />

      {/* Suggested Users */}
      <div className="mt-8">
        <Title level={4} className="text-pink-600">💘 Suggested Matches</Title>
        <Row gutter={[24, 24]}>
          {userList.map((user) => (
            <Col xs={24} sm={12} md={8} lg={6} key={user.id}>
              <Card
                hoverable
                className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-200"
                cover={
                  <img
                    alt="profile"
                    src={user.profilePic || 'https://via.placeholder.com/300x200.png?text=User'}
                    className="h-48 w-full object-cover rounded-t-2xl"
                  />
                }
              >
                <div className="flex items-center gap-4 mb-2">
                  <Avatar size="large">{user.username.charAt(0).toUpperCase()}</Avatar>
                  <div>
                    <Text strong>{user.username}</Text><br />
                    <Text type="secondary">{user.age || 'Age N/A'} yrs</Text>
                  </div>
                </div>
                <Text>{user.bio || 'Let’s connect ✨'}</Text>

                <Button
                  block
                  type="primary"
                  className="mt-3 bg-pink-500 text-white hover:bg-pink-600"
                  onClick={() => handleSendRequest(user.id)}
                >
                  💌 Send Request
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Friend List */}
      <Divider className="my-8" />
      <div>
        <Title level={4} className="text-pink-600">💞 Your Connections</Title>
        <Row gutter={[16, 16]}>
          {friends?.length ? (
            friends.map((f) => (
              <Col xs={24} sm={12} md={8} lg={6} key={f.id}>
                <Card className="rounded-xl shadow-md">
                  <div className="flex items-center gap-4">
                    <Avatar src={f.profilePic || ''}>
                      {f.username.charAt(0).toUpperCase()}
                    </Avatar>
                    <div>
                      <Text strong>{f.username}</Text><br />
                      <Text type="secondary">{f.age || 'N/A'} yrs</Text>
                    </div>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <Text type="secondary">No connections yet. Start swiping! 👀</Text>
          )}
        </Row>
      </div>
    </div>
  );
}
