import { createSlice } from "@reduxjs/toolkit"

import {
    getDepartmentList,
    getDepartmentById,
    departmentPaginationList,
    addDepartmentList,
    updateDepartmentList,
    deleteDepartmentList,
    // createDepartmentQrCodeList
} from "./thunk"

export const initialState = {
    departmentList: {
        content: [],
      totalElements: 0,
        totalPages: 0,
        number: 0,
        size: 10,
        first: true,
        last: true,
        empty: true,
    },
    // departmentQrCodeList: [],
    error: {}
}

const DepartmentSlice = createSlice({
    name: 'Department',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDepartmentList.fulfilled, (state: any, action: any) => {
            state.departmentList.content = action.payload || [];
        });
        builder.addCase(getDepartmentList.rejected, (state: any, action: any) => {
            state.error = action.payload || null;
        });

        builder.addCase(departmentPaginationList.fulfilled, (state: any, action: any) => {
            state.departmentList = action.payload; 
          });
        builder.addCase(departmentPaginationList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(getDepartmentById.fulfilled, (state: any, action: any) => {
            state.departmentList.content = action.payload || [];
        });
        builder.addCase(getDepartmentById.rejected, (state: any, action: any) => {
            state.error = action.payload || null;
        });

        builder.addCase(addDepartmentList.fulfilled, (state: any, action: any) => {
            if (!Array.isArray(state.departmentList.content)) state.departmentList.content = [];
            state.departmentList.content.unshift(action.payload);
        });
        builder.addCase(addDepartmentList.rejected, (state: any, action: any) => {
            state.error = action.payload || null;
        });

        builder.addCase(updateDepartmentList.fulfilled, (state: any, action: any) => {
            const updated = action.payload;
            if (!Array.isArray(state.departmentList.content)) {
                state.departmentList.content = [];
            }

            state.departmentList.content = state.departmentList.content.map((dep: any) =>
                dep.id === updated.id ? updated : dep
            );
        });
        builder.addCase(updateDepartmentList.rejected, (state: any, action: any) => {
            state.error = action.payload || null;
        });

        builder.addCase(deleteDepartmentList.fulfilled, (state: any, action: any) => {
            state.departmentList.content = state.departmentList.content.filter(
                (dep: any) => dep.id !== action.payload
            );
        });
        builder.addCase(deleteDepartmentList.rejected, (state: any, action: any) => {
            state.error = action.payload || null;
        });

        // builder.addCase(createDepartmentQrCodeList.fulfilled, (state: any, action: any) => {
        //     if (!Array.isArray(state.departmentQrCodeList)) state.departmentQrCodeList = [];
        //     state.departmentQrCodeList.unshift(action.payload);
        // });
        // builder.addCase(createDepartmentQrCodeList.rejected, (state: any, action: any) => {
        //     state.error = action.payload || null;
        // });
    },
});

export default DepartmentSlice.reducer