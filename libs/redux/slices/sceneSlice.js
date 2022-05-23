import { createSlice } from '@reduxjs/toolkit';

export const sceneSlice = createSlice({
  name: 'scene',
  initialState: {
    scene: 'start'
  },
  reducers: {
    switchScene: (state, action) => {
      state.scene = action.payload
    }
  }
});

export const { switchScene } = sceneSlice.actions;

export default sceneSlice.reducer;
