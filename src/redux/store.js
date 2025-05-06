import { configureStore } from '@reduxjs/toolkit';
import stepReducer from './stepSlice';
import placeholderReducer from './placeholderSlice';

const store = configureStore({
  reducer: {
    step: stepReducer,
    placeholders: placeholderReducer
  },
});

export default store;
