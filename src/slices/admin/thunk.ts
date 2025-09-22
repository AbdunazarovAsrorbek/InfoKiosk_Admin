import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAdminById as getAdminByIdApi,
    updateAdmin as updateAdminApi,
    createAdmin as createAdminApi,
    blockAdmin as blockAdminApi,
    unblockAdmin as unblockAdminApi,
    changePassword as changePasswordApi,
    getAllAdmins as getAllAdminsApi
} from "../../helpers/helper";
import { toast } from "react-toastify";

// --- Get Admin Profile ---
export const getAdminById = createAsyncThunk(
    "Admin/getAdminById",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAdminByIdApi();
            console.log("getAdminById response:", response);
            return response;
        } catch (error: any) {
            console.error("getAdminById error:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// --- Update Admin ---
export const updateAdmin = createAsyncThunk(
    "Admin/updateAdmin",
    async (dataArr: any, { rejectWithValue }) => {
        try {
            const response = await updateAdminApi(dataArr);
            console.log("updateAdmin response:", response);
            return response;
        } catch (error: any) {
            console.error("updateAdmin error:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// --- Create Admin ---
export const createAdmin = createAsyncThunk(
    "Admin/createAdmin",
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await createAdminApi(data);
            console.log("createAdmin response:", response);
            return response;
        } catch (error: any) {
            console.error("createAdmin error:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// --- Block Admin ---
export const blockAdmin = createAsyncThunk(
    "Admin/blockAdmin",
    async (adminId: number, { rejectWithValue }) => {
        try {
            const response = await blockAdminApi(adminId);
            console.log("blockAdmin response:", response);
            toast.success("Admin blok bo'ldi")
            return response.data;
        } catch (error: any) {
            console.error("blockAdmin error:", error);
            toast.error("Admin blok bo'lmadi")
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// --- Unblock Admin ---
export const unblockAdmin = createAsyncThunk(
    "Admin/unblockAdmin",
    async (adminId: number, { rejectWithValue }) => {
        try {
            const response = await unblockAdminApi(adminId);
            console.log("unblockAdmin response:", response);
            return response;
        } catch (error: any) {
            console.error("unblockAdmin error:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// --- Change Password ---
export const changePassword = createAsyncThunk(
    "Admin/changePassword",
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await changePasswordApi(data);
            console.log("changePassword response:", response);
            return response.data;
        } catch (error: any) {
            console.error("changePassword error:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// --- Get All Admins ---
export const getAllAdmins = createAsyncThunk(
    "Admin/getAllAdmins",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllAdminsApi();
            console.log("getAllAdmins response:", response);
            return response;
        } catch (error: any) {
            console.error("getAllAdmins error:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
