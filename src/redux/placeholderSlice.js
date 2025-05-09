import { createSlice } from '@reduxjs/toolkit';

const placeholdersSlice = createSlice({
  name: 'placeholders',
  initialState: {
    selectedFields: [],
  },
  reducers: {
    addField: (state, action) => {
      // Always push the new field, even if it's already in the array
      state.selectedFields.push(action.payload);
    },
    clearFields: (state) => {
      state.selectedFields = [];
    },
  },
});

export const { addField, clearFields } = placeholdersSlice.actions;
export default placeholdersSlice.reducer;
