// App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPage from './pages/UserPage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import { useSelector } from 'react-redux';
import { ConfigProvider, theme } from 'antd';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/Layout/MainLayout';

function App() {
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === 'dark';
  const { darkAlgorithm, defaultAlgorithm } = theme;

  return (
    <ConfigProvider theme={{ algorithm: isDark ? darkAlgorithm : defaultAlgorithm }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/userPage"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <UserPage />
                </MainLayout>
              </ProtectedRoute>
            } />
          <Route
            path="/chat/:id"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
