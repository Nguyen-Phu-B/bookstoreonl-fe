import { createSlice } from "@reduxjs/toolkit";

const kindsSLice = createSlice({
    name: "kinds",
    initialState: {
        listKinds: [],
    },
    reducers: {
        updateKinds: (state, action) => {
            state.listKinds = action.payload;
        },
    },
});

export const { updateKinds } = kindsSLice.actions;

export default kindsSLice.reducer;
