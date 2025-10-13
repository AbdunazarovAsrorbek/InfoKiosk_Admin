import { createSlice } from "@reduxjs/toolkit";
import {
  getRectorList,
  getRectorById,
  createRectorList,
  updateRectorList,
  deleteRectorList,
} from "./thunk";

export const initialState = {
  rectorList: {
    content: [],
  },
  errors: {},
};

const RectorSlice = createSlice({
  name: "Rector",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRectorList.fulfilled, (state:any, action:any) => {
      state.rectorList.content = action.payload;
    });

    builder.addCase(getRectorById.fulfilled, (state:any, action:any) => {
      state.rectorList = action.payload;
    });

    builder.addCase(createRectorList.fulfilled, (state:any, action:any) => {
      console.log(action.payload);
      
      // state.rectorList.content.unshift(action.payload);
    });

    builder.addCase(updateRectorList.fulfilled, (state:any, action:any) => {
      state.rectorList.content = state.rectorList.content.map((rector: any) =>
        rector.id === action.payload.id
          ? { ...rector, ...action.payload }
          : rector
      );
    });

    builder.addCase(deleteRectorList.fulfilled, (state:any, action:any) => {
      state.rectorList.content = state.rectorList.content.filter(
        (rector: any) => rector.id !== action.payload
      );
    });
  },
});

export default RectorSlice.reducer;
