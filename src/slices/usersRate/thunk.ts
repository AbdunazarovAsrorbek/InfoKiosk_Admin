import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getUsersRateList as getUsersRateListApi,
} from "../../helpers/helper";

export const getUsersRateList = createAsyncThunk("UsersRate/getUsersRateList", async ({ data }: { data: any }) => {
    try {
        const response = await getUsersRateListApi(data);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
});