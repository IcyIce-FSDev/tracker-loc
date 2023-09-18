// calculatorSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ip: "Loading...",
  newIp: false,
  gotInfo: false,
  info: {
    default: true,
  },
};

const trackerSlice = createSlice({
  name: "tracker",
  initialState,
  reducers: {
    updateIp: (state, action) => {
      state.ip = action.payload;
    },
    updateNewIp: (state, action) => {
      state.newIp = action.payload;
    },
    updateGotInfo: (state, action) => {
      state.gotInfo = action.payload;
    },
    updateInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { updateIp, updateNewIp, updateGotInfo, updateInfo } =
  trackerSlice.actions;

export default trackerSlice.reducer;
