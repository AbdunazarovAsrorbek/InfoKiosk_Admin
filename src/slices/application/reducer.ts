import { createSlice } from "@reduxjs/toolkit";
import {
    getApplicationList,
    // applyApplicationList,
    deleteApplicationList,
    changeApplicationStatusList,
    setApplicationMeetingList,
} from "./thunk";

export const initialState = {
    applicationList: { content: [] },
    loading: false,
    errors: {},
};

const ApplicationSlice = createSlice({
    name: "Application",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getApplicationList.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getApplicationList.fulfilled, (state: any, action: any) => {
                state.loading = false;
                console.log(action.payload);
                state.applicationList = action.payload;
            })
            .addCase(getApplicationList.rejected, (state: any, action: any) => {
                state.loading = false;
                state.errors = action.payload;
            })

            // .addCase(applyApplicationList.fulfilled, (state: any, action: any) => {
            //     state.applicationList.content.unshift(action.payload);
            // })

            .addCase(deleteApplicationList.fulfilled, (state: any, action: any) => {
                state.applicationList.content = state.applicationList.content.filter(
                    (item: any) => item.id !== action.payload.id
                );
            })

            .addCase(changeApplicationStatusList.fulfilled, (state: any, action: any) => {
                const item = state.applicationList.content.find(
                    (i: any) => i.id === action.payload.id
                );
                if (item) item.status = action.payload.status;
            })

            .addCase(setApplicationMeetingList.fulfilled, (state: any, action: any) => {
                const item = state.applicationList.content.find(
                    (i: any) => i.id === action.payload.id
                );
                if (item) item.meetAt = action.payload.meetAt;
            });
    },
});

export default ApplicationSlice.reducer;
