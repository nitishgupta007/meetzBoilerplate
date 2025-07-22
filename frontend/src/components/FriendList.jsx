const FriendList = ({ friends, onSelect, selectedId }) => {
  return (
    <div className="w-full">
      {friends.map(friend => (
        <div
          key={friend.id}
          onClick={() => onSelect(friend)}
          className={`p-3 cursor-pointer ${selectedId === friend.id ? 'bg-blue-100' : ''}`}
        >
          {friend.username}
        </div>
      ))}
    </div>
  );
};

export default FriendList;
