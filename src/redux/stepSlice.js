import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1, // 1 = Setup, 2 = Compose, 3 = Finalize
};

const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const { setStep } = stepSlice.actions;
export default stepSlice.reducer;
