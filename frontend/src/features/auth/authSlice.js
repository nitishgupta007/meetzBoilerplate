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
  initialState: { user: null, token: null },
  reducers: { logout: (state) => { state.user = null; state.token = null; } },
  extraReducers: (builder) => {
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;