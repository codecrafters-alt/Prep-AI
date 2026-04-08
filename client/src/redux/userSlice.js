//stores current user data
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    // Define initial state for user data
    userData: null,
  },
  reducers: {
    // Define reducers for updating user data
    //here state is the initial state and action is the payload we will send from the component to update the state if we update the setUserData then it changes the initial state of userData to the payload we send from the component
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions; //because we will set the user data in another file so we need to export the action creator function setUserData to use it in another file
export default userSlice.reducer;
