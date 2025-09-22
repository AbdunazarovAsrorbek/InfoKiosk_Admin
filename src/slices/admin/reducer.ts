import { createSlice } from "@reduxjs/toolkit";
import { getAdminById, updateAdmin, createAdmin, changePassword, blockAdmin, unblockAdmin, getAllAdmins } from "./thunk";

interface Admin {
    id: number;
    fullName: string;
    username: string;
    email: string;
    phone: string;
    status?: "ENABLE" | "BLOCKED" | null;
}

interface AdminState {
    adminProfile: Admin | null;
    allAdmins: Admin[];
    errors: any;
    message: string;
}

const initialState: AdminState = {
    adminProfile: null,
    allAdmins: [],
    errors: {},
    message: ""
};

const AdminSlice = createSlice({
    name: "Admin",
    initialState,
    reducers: {
        clearMessage: (state: any) => { state.message = ""; }
    },
    extraReducers: (builder) => {
        builder.addCase(getAdminById.fulfilled, (state: any, action: any) => {
            state.adminProfile = action.payload;
        });
        builder.addCase(updateAdmin.fulfilled, (state: any, action: any) => {
            state.adminProfile = { ...state.adminProfile, ...(action.payload) };
            state.message = "Profile updated successfully";
        });
        builder.addCase(changePassword.fulfilled, (state: any) => {
            state.message = "Password changed successfully";
        });
        builder.addCase(createAdmin.fulfilled, (state: any, action: any) => {
            if (typeof action.payload === "object") {
                state.allAdmins.push(action.payload);
            }
            state.message = "Admin created successfully";
        });
        builder.addCase(blockAdmin.fulfilled, (state, action) => {
            const updatedId = action.meta.arg; // biz jo‘natgan adminId
            state.allAdmins = state.allAdmins.map(admin =>
                admin.id === updatedId ? { ...admin, status: "BLOCKED" } : admin
            );
            state.message = "Admin blocked";
        });
        
        builder.addCase(unblockAdmin.fulfilled, (state, action) => {
            const updatedId = action.meta.arg; // biz jo‘natgan adminId
            state.allAdmins = state.allAdmins.map(admin =>
                admin.id === updatedId ? { ...admin, status: "ENABLE" } : admin
            );
            state.message = "Admin unblocked";
        });
        builder.addCase(getAllAdmins.fulfilled, (state: any, action: any) => {
            state.allAdmins = action.payload;
        });
        builder.addMatcher(
            (action: any) => action.type.endsWith("rejected"),
            (state: any, action: any) => {
                state.errors = action.payload || action.error?.message;
            }
        );
    }
});

export const { clearMessage } = AdminSlice.actions;
export default AdminSlice.reducer;
