import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

export const sendRequest = createAsyncThunk(
  'friend/sendRequest',
  async (receiverId) => {
    const res = await API.post('/friends/send', { receiverId });
    return res.data;
  }
);

export const acceptRequest = createAsyncThunk(
  'friend/accept',
  async (senderId) => {
    const res = await API.post('/friends/accept', { senderId });
    return res.data;
  }
);

export const fetchFriends = createAsyncThunk(
  'friend/fetchFriends',
  async () => {
    const res = await API.get('/friends/list');
    return res.data;
  }
);

export const fetchFriendsRequest = createAsyncThunk(
  'friend/requests',
  async () => {
    const res = await API.get('/friends/requests');
    return res.data;
  }
);

const initialState = {
  friends: [],
  pendingRequests: [],
  friendRequest:[],
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
        state.friends = [...action.payload];
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

    builder
      .addCase(fetchFriendsRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFriendsRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.friendRequest = action.payload
      })
      .addCase(fetchFriendsRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// ─── Export Actions and Reducer ────────────────────────────────

export const { clearFriendState } = friendSlice.actions;
export default friendSlice.reducer;
