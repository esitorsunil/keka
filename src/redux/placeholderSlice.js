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
    clearField: (state) => {
      state.selectedField = null;
    },
  },
});

export const { addField, clearField } = placeholderSlice.actions;
export default placeholderSlice.reducer;
