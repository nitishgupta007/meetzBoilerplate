import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ─── Async Actions ────────────────────────────────────────────

export const sendRequest = createAsyncThunk(
  'friend/sendRequest',
  async ({ token, receiverId }) => {
    const res = await axios.post(
      'http://localhost:5000/api/friends/send',
      { receiverId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  }
);

export const acceptRequest = createAsyncThunk(
  'friend/acceptRequest',
  async ({ token, requestId }) => {
    const res = await axios.post(
      'http://localhost:5000/api/friends/accept',
      { requestId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  }
);

export const fetchFriends = createAsyncThunk(
  'friend/fetchFriends',
  async (token) => {
    const res = await axios.get('http://localhost:5000/api/friends/list', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

// ─── Slice ─────────────────────────────────────────────────────

const initialState = {
  friends: [],
  pendingRequests: [],
  status: 'idle',
  error: null,
};

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    clearFriendState: (state) => {
      state.friends = [];
      state.pendingRequests = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchFriends
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.friends = action.payload.friends;
        state.pendingRequests = action.payload.pendingRequests || [];
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // sendRequest
    builder
      .addCase(sendRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // optionally add to pending list if needed
      })
      .addCase(sendRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // acceptRequest
    builder
      .addCase(acceptRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Move from pending to friends list
        const acceptedFriend = action.payload;
        state.friends.push(acceptedFriend);
        state.pendingRequests = state.pendingRequests.filter(
          (r) => r.id !== acceptedFriend.id
        );
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// ─── Export Actions and Reducer ────────────────────────────────

export const { clearFriendState } = friendSlice.actions;
export default friendSlice.reducer;
