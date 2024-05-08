import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: true,
        isLogin: false,
        userLogin: null,
    },
    reducers: {
        login: (state, action) => {
            state.loading = false;
            state.isLogin = true;
            state.userLogin = action.payload;
        },

        logout: (state, action) => {
            state.loading = false;
            state.isLogin = false;
            state.userLogin = null;
            localStorage.removeItem("accessToken");
        },

        updateAvatar: (state, action) => {
            state.userLogin = { ...state.userLogin, ...action.payload };
        },

        updateUser: (state, action) => {
            state.userLogin = { ...state.userLogin, ...action.payload };
        },
    },
});

export const { login, logout, updateAvatar, updateUser } = authSlice.actions;

export default authSlice.reducer;
