import React from 'react';

const MessageBox = ({ message, currentUser }) => {
  const isOwn = message.senderId === currentUser.id;
  return (
    <div className={`my-2 flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`px-4 py-2 rounded-lg ${isOwn ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
        {message.text}
      </div>
    </div>
  );
};

export default MessageBox;
