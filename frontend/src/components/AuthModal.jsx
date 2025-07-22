import { useState } from 'react';
import { Modal, Button, Form, Input, Typography, Space, Divider } from 'antd';
import {
  GoogleOutlined,
  FacebookOutlined,
  PhoneOutlined,
  MailOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { signupUser } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const { Text, Link } = Typography;

export default function AuthModal({ open, onClose }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (values) => {
    const payload = {
      username: values.email, // assuming your form uses `email` field
      password: values.password,
    };

    try {
      if (isLogin) {
        await dispatch(loginUser(payload)).unwrap();
      } else {
        await dispatch(signupUser(payload)).unwrap();
      }

      // Optional: Close modal or redirect user
      onClose();
    } catch (err) {
      console.error('❌ Auth Error:', err);
      // Show user-friendly error using AntD message if needed
      // message.error(err.message || 'Authentication failed');
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
      closeIcon={<span style={{ fontSize: 20 }}>✖</span>}
    >
      <div className="text-center mb-4">
        <img src="/logo.png" alt="Logo" className="mx-auto w-10 mb-2" />
        <h2>{isLogin ? 'Get started' : 'Create account'}</h2>
        <Text type="secondary">
          {isLogin
            ? 'By tapping Log in or Continue, you agree to our '
            : 'By signing up, you agree to our '}
          <Link>Terms</Link>, <Link>Privacy Policy</Link> and <Link>Cookie Policy</Link>.
        </Text>
      </div>

      <Space direction="vertical" style={{ width: '100%' }}>
        <Button icon={<GoogleOutlined />} block type="primary">
          Continue with Google
        </Button>
        <Button icon={<FacebookOutlined />} block>
          Login with Facebook
        </Button>
        <Button icon={<PhoneOutlined />} block>
          Log in with phone number
        </Button>
      </Space>

      <Divider plain>OR</Divider>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="email" rules={[{ required: true }]} >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]} >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          {isLogin ? 'Login' : 'Sign up'}
        </Button>
      </Form>

      <div className="mt-3 text-center">
        <Link>{isLogin ? 'Trouble logging in?' : 'Already have an account?'}</Link>
        <br />
        <Button type="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create new account' : 'Back to Login'}
        </Button>
      </div>

      <div className="mt-4 text-center">
        <Text strong>Get the app!</Text>
        <div className="flex justify-center gap-2 mt-2">
          <img src="/appstore.png" alt="App Store" className="w-24" />
          <img src="/playstore.png" alt="Play Store" className="w-24" />
        </div>
      </div>
    </Modal>
  );
}
