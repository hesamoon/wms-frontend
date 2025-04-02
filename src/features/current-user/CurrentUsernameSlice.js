import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const currentUserSlice = createSlice({
  name: "current-user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload.currUser;
    },
  },
});

export default currentUserSlice.reducer;
export const getCurrentUser = (state) => state.currentUser;
export const { setCurrentUser } = currentUserSlice.actions;
