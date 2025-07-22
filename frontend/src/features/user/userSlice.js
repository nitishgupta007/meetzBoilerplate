import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ─── Async Action ─────────────────────────────────────────────

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (token) => {
    const res = await axios.get('http://localhost:5000/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

// ─── Initial State ─────────────────────────────────────────────

const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

// ─── Slice ─────────────────────────────────────────────────────

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.users = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.users || action.payload; // handle both response types
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// ─── Export ─────────────────────────────────────────────────────

export const { clearUsers } = userSlice.actions;
export default userSlice.reducer;
