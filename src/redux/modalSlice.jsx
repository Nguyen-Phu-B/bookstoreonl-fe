import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isModalOpen: false,
    },
    reducers: {
        toggleModal: (state, action) => {
            state.isModalOpen = !state.isModalOpen;
        },
    },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
