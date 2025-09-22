import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getFacultyList as getFacultyListApi,
    facultyPaginationList as facultyPaginationListApi,
    addFacultyList as addFacultyListApi,
    updateFacultyList as updateFacultyListApi,
    deleteFacultyList as deleteFacultyListApi
} from "../../helpers/helper";
import { toast } from "react-toastify";

export const getFacultyList = createAsyncThunk("Faculty/getFacultyList", async () => {
    try {
        const response = await getFacultyListApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const facultyPaginationList = createAsyncThunk(
    "Faculty/facultyPaginationList",
    async (data: { page: number; size: number }) => {
        try {
            const response = await facultyPaginationListApi(data);
            console.log(response);

            return response;
        } catch (error) {
            throw error;
        }
    }
);

export const addFacultyList = createAsyncThunk("Faculty/addFacultyList", async (faculty: any) => {
    try {
        const response = await addFacultyListApi(faculty);
        toast.success("Faculty Added Successfully", { autoClose: 2000 });
        return response;
    } catch (error) {
        toast.error("Faculty Added Failed", { autoClose: 2000 });
        return error;
    }
});

export const updateFacultyList = createAsyncThunk("Faculty/updateFaculty", async ({ updateFormData, id }: any) => {
    try {
        const response = await updateFacultyListApi({ updateFormData, id });
        toast.success("Faculty Updated Successfully", { autoClose: 2000 });
        return response;
    } catch (error) {
        toast.error("Faculty Update Failed", { autoClose: 2000 });
        return error;
    }
});

export const deleteFacultyList = createAsyncThunk("Faculty/deleteFacultyList", async (facultyId: any) => {
    try {
        const response = deleteFacultyListApi(facultyId);
        toast.success("Faculty Deleted Successfully", { autoClose: 2000 });
        return facultyId;
    } catch (error) {
        toast.error("Faculty Deleted Failed", { autoClose: 2000 });
        return error;
    }
})
