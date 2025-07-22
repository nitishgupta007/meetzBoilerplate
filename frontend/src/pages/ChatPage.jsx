import React, { useEffect, useState } from 'react';
import socket from '../socket';
import { useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';
import FriendList from '../components/FriendList';

const ChatPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [currentFriend, setCurrentFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!user) return;
    socket.emit('join', user.id);
    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  const handleSend = () => {
    if (!text.trim()) return;
    const msg = {
      senderId: user.id,
      receiverId: currentFriend.id,
      text,
    };
    socket.emit('send_message', msg);
    setMessages((prev) => [...prev, msg]);
    setText('');
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r p-4">
        <h2 className="text-xl mb-4">Friends</h2>
        {/* You should fetch and pass friends list from Redux or API */}
        <FriendList friends={[]} onSelect={setCurrentFriend} selectedId={currentFriend?.id} />
      </div>
      <div className="w-3/4 p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {messages.map((m, i) => (
            <MessageBox key={i} message={m} currentUser={user} />
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            className="border px-4 py-2 flex-1 rounded"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSend} className="bg-blue-500 text-white px-4 rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
