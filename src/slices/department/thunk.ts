import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getDepartmentList as getDepartmentListApi,
    getDepartmentById as getDepartmentByIdApi,
    departmentPaginationList as departmentPaginationListApi,
    addDepartmentList as addDepartmentListApi,
    updateDepartmentList as updateDepartmentListApi,
    deleteDepartmentList as deleteDepartmentListApi,
    createDepartmentQrCodeList as createDepartmentQrCodeListApi
} from '../../helpers/helper'

import { toast } from "react-toastify";

export const getDepartmentList = createAsyncThunk("Department/getDepartmentList", async () => {
    try {
        const response = await getDepartmentListApi();
        return response;
    } catch (error) {
        return error;
    }
})

export const departmentPaginationList = createAsyncThunk(
    "Department/departmentPaginationList",
    async (data: { page: number; size: number }) => {
        try {
            const response = await departmentPaginationListApi(data);
            console.log(response);

            return response;
        } catch (error) {
            throw error;
        }
    }
);

export const getDepartmentById = createAsyncThunk("Department/getDepartmentById", async (id: any) => {
    try {
        const response = await getDepartmentByIdApi(id);
        return response;
    } catch (error) {
        return error;
    }
})

export const addDepartmentList = createAsyncThunk("Department/addDepartmentList", async (Department: any) => {
    try {
        const response = await addDepartmentListApi(Department);
        return response;
    } catch (error) {
        return error;
    }
});

export const updateDepartmentList = createAsyncThunk(
    "Department/updateDepartmentList",
    async ({ updateFormData, id }: any) => {
        try {
            const response = await updateDepartmentListApi({ updateFormData, id });
            toast.success("Department Updated Successfully", { autoClose: 2000 });
            return response;
        } catch (error: any) {
            toast.error("Department Update Failed", { autoClose: 2000 });
            return error.response?.data || error.message;
        }
    }
);

export const deleteDepartmentList = createAsyncThunk("Department/deleteDepartmentList", async (DepartmentId: any) => {
    try {
        const response = await deleteDepartmentListApi(DepartmentId);
        return DepartmentId;
    } catch (error) {
        return error;
    }
})

export const createDepartmentQrCodeList = createAsyncThunk("Department/createDepartmentQrCodeList",
    async (departmentId: any) => {
        try {
            const response = await createDepartmentQrCodeListApi(departmentId);
            return response;
        } catch (error) {
            return error
        }
    }
);


