import { useState } from 'react';
import { Layout, Button, Typography } from 'antd';
import {
  AppleOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../components/Header';
import AuthModal from '../components/AuthModal';

const { Content } = Layout;
const { Title } = Typography;

const phones = ['apoorva', 'prachi', 'aditya', 'shruti', 'arman', 'eshna'];

export default function HomePage() {
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === 'dark';
  const [authVisible, setAuthVisible] = useState(false);

  return (
    <Layout style={{ height: 'calc(100vh)' }} >
      {/* Header */}
      <HeaderComponent setAuthVisible={setAuthVisible} />

      {/* Phone Backgrounds */}
      <div className="relative w-full flex flex-wrap justify-center items-center pointer-events-none">
        {phones.map((name, index) => (
          <div
            key={index}
            className={`w-36 h-72 m-2 rounded-xl shadow-md ${isDark ? 'bg-neutral-800 text-white' : 'bg-white text-black'
              }`}
          >
            <div className="h-2 bg-red-500"></div>
            <div className="p-3 text-center font-bold capitalize">{name}</div>
          </div>
        ))}
      </div>

      {/* Main CTA */}
      <Content className="relative flex flex-col items-center justify-center text-center mt-12">
        <Title level={1} className={isDark ? '!text-white' : '!text-black'}>
          Start something epic.
        </Title>
        <div className="flex gap-4 mt-4">
          <Button
            icon={<AppleOutlined />}
            size="large"
            className={isDark ? 'bg-neutral-700 text-white' : 'bg-white text-black'}
            shape="round"
          >
            App Store
          </Button>
          <Button
            icon={<GoogleOutlined />}
            size="large"
            className={isDark ? 'bg-neutral-700 text-white' : 'bg-white text-black'}
            shape="round"
          >
            Google Play
          </Button>
        </div>
      </Content>
      <AuthModal open={authVisible} onClose={() => setAuthVisible(false)} />
    </Layout>
  );
}
