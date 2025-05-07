// store/placeholderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const placeholderSlice = createSlice({
  name: 'placeholders',
  initialState: {
    selectedField: null,
  },
  reducers: {
    addField: (state, action) => {
      state.selectedField = action.payload;
    },
  },
});

export const { addField } = placeholderSlice.actions;
export default placeholderSlice.reducer;
