import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./counterSlice";
import fusionReducer from "./fusionSlice";

export default configureStore({
  reducer: {
    // counter: counterReducer,
    fusion: fusionReducer,
  },
});
