import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRectorList as getRectorListApi,
  getRectorById as getRectorByIdApi,
  createRector as createRectorApi,
  updateRector as updateRectorApi,
  deleteRector as deleteRectorApi,
} from "../../helpers/helper";
import { toast } from "react-toastify";

// Get all
export const getRectorList = createAsyncThunk("Rector/getRectorList", async () => {
  try {
    const response = await getRectorListApi();
    return response;
  } catch (error) {
    throw error;
  }
});

// Get by ID
export const getRectorById = createAsyncThunk(
  "Rector/getRectorById",
  async (id: number) => {
    try {
      const response = await getRectorByIdApi(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Create
export const createRectorList = createAsyncThunk(
  "Rector/createRectorList",
  async (rector: any) => {
    try {
      const response = await createRectorApi(rector);
      toast.success("Rector Added Successfully", { autoClose: 2000 });
      return response;
    } catch (error) {
      toast.error("Rector Add Failed", { autoClose: 2000 });
      throw error;
    }
  }
);

// Update
export const updateRectorList = createAsyncThunk(
  "Rector/updateRectorList",
  async ({ id, data }: { id: number; data: any }) => {
    try {
      const response = await updateRectorApi(id, data);
      toast.success("Rector Updated Successfully", { autoClose: 2000 });
      console.log(response.data);
      console.log(response);
      return response;
    } catch (error) {
      toast.error("Rector Update Failed", { autoClose: 2000 });
      throw error;
    }
  }
);


// Delete
export const deleteRectorList = createAsyncThunk(
  "Rector/deleteRectorList",
  async (id: number) => {
    try {
      await deleteRectorApi(id);
      toast.success("Rector Deleted Successfully", { autoClose: 2000 });
      return id;
    } catch (error) {
      toast.error("Rector Delete Failed", { autoClose: 2000 });
      throw error;
    }
  }
);
