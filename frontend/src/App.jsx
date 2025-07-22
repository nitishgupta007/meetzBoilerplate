import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import { useSelector } from 'react-redux';
import { ConfigProvider, theme } from 'antd';

function App() {
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === 'dark';
  const { darkAlgorithm, defaultAlgorithm } = theme;

  return (
      <ConfigProvider theme={{ algorithm: isDark ? darkAlgorithm : defaultAlgorithm }}>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignupPage />} />
              {/* <Route path="/home" element={<HomePage />} /> */}
              <Route path="/chat/:id" element={<ChatPage />} />
            </Routes>
          </Router>
        </ConfigProvider>
  );

}
export default App;
