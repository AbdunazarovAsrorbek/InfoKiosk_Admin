import { createSlice } from "@reduxjs/toolkit";

import { getFacultyList, facultyPaginationList, addFacultyList, updateFacultyList, deleteFacultyList } from "./thunk";

export const initialState = {
    facultyList: {
        content: [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        size: 10,
        first: true,
        last: true,
        empty: true,
    },
    errors: {}
};

const FacultySlice = createSlice({
    name: 'Faculty',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getFacultyList.fulfilled, (state: any, action: any) => {
            state.facultyList.content = action.payload;
        });
        builder.addCase(getFacultyList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(facultyPaginationList.fulfilled, (state: any, action: any) => {
            state.facultyList = action.payload;
        });
        builder.addCase(facultyPaginationList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(addFacultyList.fulfilled, (state: any, action: any) => {
            if (!Array.isArray(state.facultyList.content)) {
                state.facultyList = [];
            }
            state.facultyList.content.unshift(action.payload);
        });
        builder.addCase(addFacultyList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(updateFacultyList.fulfilled, (state: any, action: any) => {
            state.facultyList.content = state.facultyList.content.map((Faculty: any) =>
                Faculty.id === action.payload.id
                    ? { ...Faculty, ...action.payload }
                    : Faculty
            );
        });

        builder.addCase(updateFacultyList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(deleteFacultyList.fulfilled, (state: any, action: any) => {
            state.facultyList.content = state.facultyList.content.filter(
                (f: any) => f.id !== action.payload
            );
        })
        builder.addCase(deleteFacultyList.rejected, (state: any, action: any) => {
            state.error = action.error || null;
        });
    }
});

export default FacultySlice.reducer;