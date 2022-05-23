import { configureStore } from '@reduxjs/toolkit';
import sceneReducer from './slices/sceneSlice';

export const store = configureStore({
  reducer: {
    switcher: sceneReducer
  }
});
