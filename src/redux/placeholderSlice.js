// placeholderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const placeholderSlice = createSlice({
  name: 'placeholders',
  initialState: {
    latestField: null,
  },
  reducers: {
    addField: (state, action) => {
      state.latestField = action.payload; // only latest clicked
    },
  },
});

export const { addField } = placeholderSlice.actions;
export default placeholderSlice.reducer;