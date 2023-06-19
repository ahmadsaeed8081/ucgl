import { createSlice } from "@reduxjs/toolkit";
const userToken = localStorage.getItem("userToken");

const globalReducer = createSlice({
  name: "global",
  initialState: {
    success: "",
    searchBar: false,
    userToken: userToken ? userToken : null,
    openSidebar: false,
  },
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    setOpenSidebar: (state, action) => {
      state.openSidebar = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearMessage: (state) => {
      state.success = "";
    },
    toggleSearchBar: (state) => {
      state.searchBar = !state.searchBar;
    },
    logout: (state, { payload }) => {
      localStorage.removeItem(payload);
      state.userToken = null;
      localStorage.removeItem("userToken");
    },
  },
});
export const {
  setSuccess,
  clearMessage,
  toggleSearchBar,
  setUserToken,
  logout,
  setOpenSidebar,
} = globalReducer.actions;
export default globalReducer.reducer;
