import { createSlice } from "@reduxjs/toolkit";

import { getUsersRateList } from "./thunk";

export const initialState = {
    usersRateList: {
        content: []
    },
    errors: {}
};

const UsersRateSlice = createSlice({
    name: 'UsersRate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsersRateList.fulfilled, (state: any, action: any) => {
            console.log(action.payload);
            state.usersRateList = action.payload;
        });
        builder.addCase(getUsersRateList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
    }
});

export default UsersRateSlice.reducer;