import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    user: null,
    tenant: null,
    isAuthenticated: false,
    isloading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserNTenant: (state, action) => {
      state.user = action.payload.user;
      state.tenant = action.payload.tenant;
      state.isAuthenticated = true;
      state.isloading = false;
    },
    removeUserNTenant: (state) => {
      state.user = null;
      state.tenant = null;
      state.isAuthenticated = false;
      state.isloading = false;
    },
  },
});

export let { setUser, setUserNTenant, removeUserNTenant } = AuthSlice.actions;
export default AuthSlice.reducer;
