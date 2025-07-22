import { useState, useEffect } from 'react';
import { fetchFriends } from '../features/friend/friendSlice';
import SearchUserBox from '../components/userSearch';
import { useDispatch } from 'react-redux';

export default function UserPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]); // Only runs once on mount

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      userloggedin
      <SearchUserBox />
    </div>
  );
}
