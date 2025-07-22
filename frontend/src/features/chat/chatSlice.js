import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ token, receiverId, content }) => {
    const res = await axios.post(
      'http://localhost:4000/api/messages/send',
      { receiverId, content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  }
);

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async ({ token, friendId }) => {
    const res = await axios.get(`http://localhost:4000/api/messages/${friendId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

// Initial State
const initialState = {
  messages: [],
  loading: false,
  error: null,
};

// Slice
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // For adding a message via socket.io real-time
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMessages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // sendMessage
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export Actions
export const { addMessage, clearMessages } = chatSlice.actions;

// Export Reducer
export default chatSlice.reducer;
