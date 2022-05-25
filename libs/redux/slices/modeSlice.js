import { createSlice } from '@reduxjs/toolkit';

export const modeSlice = createSlice({
  name: 'mode',
  initialState: {
    mode: 'management',
  },
  reducers: {
    selectMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { selectMode } = modeSlice.actions;

export default modeSlice.reducer;
