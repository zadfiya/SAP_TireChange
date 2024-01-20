import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { globalSlice } from "./slice/globalSlice";

const rootReducer = combineReducers({
  global: globalSlice.reducer,
});

export default configureStore({
  reducer: rootReducer,
});
