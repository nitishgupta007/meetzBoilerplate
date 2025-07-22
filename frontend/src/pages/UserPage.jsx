import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFriends, sendRequest, fetchFriendsRequest, acceptRequest } from '../features/friend/friendSlice';
import SearchUserBox from '../components/userSearch';
import { Avatar, Button, Typography, Card, Row, Col } from 'antd';

const { Text, Title } = Typography;

export default function UserPage() {
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
    <div className="min-h-screen bg-pink-50 p-6">
      <Title level={2} className="text-center text-pink-600 font-bold mb-6">
        💖 Find Your Vibe
      </Title>

      <SearchUserBox setUserList={setUserList} />

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
    </div>
  );
}
