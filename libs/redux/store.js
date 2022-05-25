import { combineReducers, configureStore } from '@reduxjs/toolkit';
import sceneReducer from './slices/sceneSlice';
import modeReducer from './slices/modeSlice';

export const store = configureStore({
  reducer: combineReducers({
    scene: sceneReducer,
    mode: modeReducer,
  })
});
