import { configureStore } from "@reduxjs/toolkit";

// reducers
import currentUserReducer from "../features/current-user/CurrentUsernameSlice.js";

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

export default store;
