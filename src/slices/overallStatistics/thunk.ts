import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getOverallList as getOverallListApi,
} from "../../helpers/helper";

export const getOverallList = createAsyncThunk("Overall/getOverallList",
    async ({ from, to }: { from?: string; to?: string } = {}) => {
        try {
            const response = await getOverallListApi(from, to);
            return response;
        } catch (error) {
            return error;
        }
    }
);

