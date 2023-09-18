import { configureStore } from "@reduxjs/toolkit";
import trackerSlice from "./trackerSlice";

const store = configureStore({
  reducer: {
    tracker: trackerSlice, // Add your calculatorSlice reducer here
    // Add other slices' reducers here if you have them
  },
});

export default store;
