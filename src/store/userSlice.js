import { createSlice } from "@reduxjs/toolkit";
import ROLE from "../common/role";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    tempProfilePic: null,
    avatarUpdated: false, 
  },
  reducers: {
    setUserDetails: (state, action) => {
      if (action.payload) {
        const mappedUser = { ...action.payload };
        if (mappedUser.role) {
          if (mappedUser.role === "ADMIN") mappedUser.role = ROLE.ADMIN;
          else if (mappedUser.role === "GENERAL")
            mappedUser.role = ROLE.GENERAL;
        }
        state.user = mappedUser;
      } else {
        state.user = null;
      }
    },
    setTempProfilePic: (state, action) => {
      state.tempProfilePic = action.payload;
    },
    setAvatarUpdated: (state, action) => {
      state.avatarUpdated = action.payload;
    },
  },
});

export const { setUserDetails, setTempProfilePic, setAvatarUpdated } =
  userSlice.actions;

export default userSlice.reducer;
