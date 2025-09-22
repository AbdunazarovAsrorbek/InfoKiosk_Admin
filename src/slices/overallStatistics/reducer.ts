import { createSlice } from "@reduxjs/toolkit";

import { getOverallList } from "./thunk";

export const initialState = {
    overallList: {
        content: []
    },
    selectedAcademy: null,
    errors: {}
};

const OverallSlice = createSlice({
    name: 'Overall',
    initialState,
    reducers: {
        setSelectedAcademy: (state, action) => {
            state.selectedAcademy = action.payload;
        },
    },
    extraReducers: (builder) => {

        builder.addCase(getOverallList.fulfilled, (state: any, action: any) => {
            state.overallList = action.payload;
        });
        builder.addCase(getOverallList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

    }
});

export const { setSelectedAcademy } = OverallSlice.actions;
export default OverallSlice.reducer;