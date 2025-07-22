import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5000/api';

export const signupUser = createAsyncThunk('auth/signup', async (data) => {
  const res = await axios.post(`${API}/signup`, data);
  return res.data;
});

export const loginUser = createAsyncThunk('auth/loginUser', async (data) => {
  const res = await axios.post(`${API}/login`, data);
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;