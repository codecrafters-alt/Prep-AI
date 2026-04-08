import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"; //importing the user reducer from userSlice.js
export default configureStore({
  reducer: {
    //ishke under user ka area and interview ka area banayenge jisme hum user aur interview se related state rakhenge
    user: userSlice
  },
});
