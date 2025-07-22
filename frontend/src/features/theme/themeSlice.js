// src/features/theme/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light', // or 'dark'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleMode } = themeSlice.actions;
export default themeSlice.reducer;
