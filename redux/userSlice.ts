import { createSlice } from "@reduxjs/toolkit";
import { IItem } from "../utils/method";
import { RootState } from "./store";

export interface IUser {
  uid?: string;
  email?: string;
  emailVerified?: boolean;
  displayName?: string;
  isAnonymous?: boolean;
  photoURL?: string;
  createdAt?: string;
  lastLoginAt?: string;
  apiKey?: string;
  appName?: string;
  role?: string;
  items?: IItem[];
}

const initialState: { status: string; isAuthenticated: boolean; user?: IUser } =
  {
    status: "idle",
    isAuthenticated: false,
  };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUser: (state, action?) => {
      if (action.payload) {
        state.status = "complete";
        state.isAuthenticated = true;
        state.user = action.payload;
      } else {
        state.status = "complete";
        state.isAuthenticated = false;
        state.user = undefined;
      }
    },
    updateUser: (state, action) => {
      state.status = "complete";
      state.isAuthenticated = true;
      state.user = {
        ...state.user,
        role: action.payload.role,
        items: action.payload.items,
      };
    },
    signOutUser: (state) => {
      state.status = "complete";
      state.isAuthenticated = false;
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(fetchUser.pending, (state, action) => {
    //     state.status = "loading";
    //   })
    //   .addCase(fetchUser.fulfilled, (state, action) => {
    //     state.status = "complete";
    //     state.currentUser = action.payload;
    //   })
    //   .addCase(fetchUser.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.error;
    //   })
  },
});

export const selectUser = (state: RootState) => state.user;
export const { fetchUser, updateUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;
