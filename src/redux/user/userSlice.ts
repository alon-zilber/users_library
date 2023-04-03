import { createSlice } from "@reduxjs/toolkit";
import { IUserData } from "../../types/userData";
import { fetchUsers } from "./userThunk";

const initialState: IUserData[] = [];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserData: (state, { payload }: { payload: IUserData }) => {
      const index = state.findIndex((el) => el.id === payload.id);

      state[index] = payload;
    },
    addNewUser: (state, { payload }: { payload: IUserData }) => {  
        state.push(payload)
      },
      deleteUser: (state, { payload }: { payload: string }) => {  
        const index = state.findIndex((el) => el.id === payload);
        state.splice(index, 1)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state: IUserData[], { payload }) => {
      if (payload) {
        return payload;
      }
    });
  },
});

export const { updateUserData, addNewUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
