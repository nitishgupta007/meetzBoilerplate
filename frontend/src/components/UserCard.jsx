import React from 'react';

const UserCard = ({ user, onAction, actionLabel = "Add" }) => {
  return (
    <div className="p-4 border rounded shadow flex justify-between items-center bg-white">
      <div>
        <p className="font-semibold">{user.username}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <button
        onClick={() => onAction(user)}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        {actionLabel}
      </button>
    </div>
  );
};

export default UserCard;
