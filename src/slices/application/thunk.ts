import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getApplicationList as getApplicationListApi,
    deleteApplicationList as deleteApplicationListApi,
    changeApplicationStatusList as changeApplicationStatusListApi,
    setApplicationMeetingList as setApplicationMeetingListApi,
    getApplicationQrCodeList as getApplicationQrCodeListApi
} from "../../helpers/helper";

// LIST
export const getApplicationList = createAsyncThunk(
    "Application/getApplicationList",
    async ({ from, to, status, data }: { from?: string; to?: string; status?: string; data: any }) => {
        try {
            const params: any = {};
            if (from) params.from = from;
            if (to) params.to = to;
            if (status) params.status = status;

            const response = await getApplicationListApi(data, params);
            console.log(response);

            return response;
        } catch (error: any) {
            throw error.response || error.message;
        }
    }
);

// DELETE
export const deleteApplicationList = createAsyncThunk(
    "Application/deleteApplicationList",
    async (id: number) => {
        try {
            const response = await deleteApplicationListApi(id);
            return { id, response };
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

// CHANGE STATUS
export const changeApplicationStatusList = createAsyncThunk(
    "Application/changeApplicationStatus",
    async ({ id, status }: { id: number; status: string }) => {
        try {
            const response = await changeApplicationStatusListApi(id, status);
            return { id, status, response };
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

// MEET AT
export const setApplicationMeetingList = createAsyncThunk(
    "Application/setApplicationMeeting",
    async ({ id, meetAt }: { id: number; meetAt: string }) => {
        try {
            const response = await setApplicationMeetingListApi(id, meetAt);
            return { id, meetAt, response };
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

export const getApplicationQrCodeList = createAsyncThunk("Application/getApplicationQrCodeList",
    async () => {
        try {
            const response = await getApplicationQrCodeListApi();
            return response;
        } catch (error) {
            return error
        }
    }
);