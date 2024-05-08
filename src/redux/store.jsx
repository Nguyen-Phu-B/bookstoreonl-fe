import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import modalSlice from "./modalSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        modal: modalSlice,
        cart: cartSlice,
    },
});

export default store;
