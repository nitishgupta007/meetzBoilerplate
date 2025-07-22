import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// Automatically attach token to each request if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or from Redux state if needed
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
