import React from 'react';
import { Avatar, Input, Divider } from 'antd';
import {
  VideoCameraOutlined,
  PictureOutlined,
  SmileOutlined
} from '@ant-design/icons';

const PostInputBox = ({ username = "Nitish", avatarUrl }) => {
  return (
    <div className="bg-[#1c1e21] p-4 rounded-xl text-white shadow-md" style={{maxWidth:'450px'}}>
      {/* Input Row */}
      <div className="flex items-center mb-4" style={{gap: '10px'}}>
        <Avatar src={avatarUrl} size="large" />
        <Input
          placeholder={`What's on your mind, ${username}?`}
          className="bg-[#3a3b3c] text-white border-none rounded-full px-4 py-2"
          style={{ flex: 1 }}
        />
      </div>

      <Divider className="bg-[#3a3b3c] m-0" />

      {/* Action Buttons */}
      <div className="flex justify-around mt-3">
        <ActionButton
          icon={<VideoCameraOutlined className="text-red-500 text-lg" />}
          label="Live video"
        />
        <ActionButton
          icon={<PictureOutlined className="text-green-500 text-lg" />}
          label="Photo/video"
        />
        <ActionButton
          icon={<SmileOutlined className="text-yellow-400 text-lg" />}
          label="Feeling/activity"
        />
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label }) => (
  <div className="flex items-center space-x-2 cursor-pointer hover:bg-[#3a3b3c] px-3 py-2 rounded-lg transition">
    {icon}
    <span className="text-sm">{label}</span>
  </div>
);

export default PostInputBox;
