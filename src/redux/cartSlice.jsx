import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    },
    reducers: {
        addItemToCart: (state, action) => {
            const newItem = action.payload;
            const existingItemIndex = state.cartItems.findIndex((item) => item.productId === newItem.productId);

            if (existingItemIndex !== -1) {
                state.cartItems[existingItemIndex].quantity += newItem.quantity;
            } else {
                state.cartItems.push(newItem);
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        decreaseQuantity: (state, action) => {
            const productId = action.payload;
            const itemToDecrease = state.cartItems.find((item) => item.productId === productId);

            if (itemToDecrease) {
                if (itemToDecrease.quantity > 1) {
                    itemToDecrease.quantity -= 1;
                } else {
                    state.cartItems = state.cartItems.filter((item) => item.productId !== productId);
                }
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        increaseQuantity: (state, action) => {
            const productId = action.payload;
            const itemToIncrease = state.cartItems.find((item) => item.productId === productId);

            itemToIncrease.quantity += 1;

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        removeItemFromCart: (state, action) => {
            const productId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.productId !== productId);

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        updateCartItemsQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const cartItemToUpdate = state.cartItems.find((item) => item.productId === productId);
            if (cartItemToUpdate) {
                cartItemToUpdate.quantity = quantity;

                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            }
        },

        removeCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cartItems");
        },
    },
});

export const {
    decreaseQuantity,
    increaseQuantity,
    addItemToCart,
    removeItemFromCart,
    updateCartItemsQuantity,
    removeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
