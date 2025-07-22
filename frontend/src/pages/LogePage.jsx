import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/user/userSlice';
// import ChatBox from '../components/ChatBox';
import UserCard from '../components/UserCard';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:5000');

export default function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { friends } = useSelector((state) => state.friend);

  useEffect(() => {
    if (user) {
      dispatch(fetchUsers());
    //   dispatch(getFriends());
      socket.emit('setup', user);
    }
  }, [user]);

  return (
    <div className="p-4 flex">
      <div className="w-1/3 pr-4">
        <h2 className="text-lg font-bold mb-2">Users</h2>
        {users.map(u => <UserCard key={u.id} user={u} socket={socket} />)}
        <h2 className="text-lg font-bold mt-4 mb-2">Friends</h2>
        {friends.map(f => <UserCard key={f.id} user={f} socket={socket} isFriend />)}
      </div>
      <div className="w-2/3">
        {/* <ChatBox socket={socket} /> */}
      </div>
    </div>
  );
}
