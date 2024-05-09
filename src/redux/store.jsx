import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import kindsSlice from "./kindsSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        kinds: kindsSlice,
        cart: cartSlice,
    },
});

export default store;
