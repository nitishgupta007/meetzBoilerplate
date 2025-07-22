import { AutoComplete, Avatar, Typography, Space } from 'antd';
import debounce from 'lodash.debounce';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { Text } = Typography;

export default function SearchUserBox({ onSelectUser }) {
  const [options, setOptions] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const fetchUsers = async (value) => {
    if (value.length < 3) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/users/search?q=${value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const results = res.data.map((user) => ({
        value: user.id,
        label: (
          <Space>
            <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
            <Text>{user.username}</Text>
          </Space>
        ),
        userData: user,
      }));

      setOptions(results);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchUsers, 300), []);

  return (
    <AutoComplete
      style={{ width: 300 }}
      placeholder="Search users..."
      options={options}
      onSearch={debouncedFetch}
      onSelect={(id, option) => onSelectUser(option.userData)}
    />
  );
}
