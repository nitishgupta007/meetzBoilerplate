import React from 'react';
import { Col, Card, Avatar, Typography, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { acceptRequest } from '../features/friend/friendSlice';

const { Text } = Typography;

const FriendSidebar = () => {
  const dispatch = useDispatch();
  const friendRequest = useSelector((state) => state.friends.friendRequest);
  const friendList = useSelector((state) => state.friends.friends);

  const cardStyle = {
    backgroundColor: '#001529',
    color: '#ffffff',
  };

  const textStyle = {
    color: '#ffffff',
  };

  return (
    <Col xs={24} md={8} lg={7}>
      {/* Pending Requests */}
      <Card title={<span style={textStyle}>Pending Friend Requests</span>} bordered={false} style={cardStyle}>
        {friendRequest.length === 0 ? (
          <Text type="secondary" style={textStyle}>No requests yet.</Text>
        ) : (
          friendRequest.map((friend) => (
            <div key={friend.id} className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>{friend.sender.username.charAt(0).toUpperCase()}</Avatar>
                <Text style={textStyle}>{friend.sender.username}</Text>
              </div>
              <Button
                size="small"
                type="primary"
                onClick={() => dispatch(acceptRequest(friend.senderId))}
              >
                Accept
              </Button>
            </div>
          ))
        )}
      </Card>

      {/* Friend List */}
      <Card title={<span style={textStyle}>Friend List</span>} bordered={false} style={{ ...cardStyle, marginTop: 16 }}>
        {friendList.length === 0 ? (
          <Text type="secondary" style={textStyle}>No Friends Yet</Text>
        ) : (
          friendList.map((friend) => (
            <div key={friend.id} className="mb-2 flex items-center justify-between p-2" style={{background:'slategrey'}}>
              <div className="flex items-center gap-2">
                <Avatar>{friend.username.charAt(0).toUpperCase()}</Avatar>
                <Text style={textStyle}>{friend.username}</Text>
              </div>
              <Button size="small" type="default" danger>
                Unfriend
              </Button>
            </div>
          ))
        )}
      </Card>
    </Col>
  );
};

export default FriendSidebar;
