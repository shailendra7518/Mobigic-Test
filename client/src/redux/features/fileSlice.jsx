import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: null,
  error: null,
  loading: false,
};

const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    getFilesSuccess: (state, action) => {
      state.files = action.payload;
      (state.loading = false), (state.error = null);
      },
      addFile:(state, action) => {
      state.files = [...state.files,action.payload];
      (state.loading = false), (state.error = null);
      }
  },
});

export const {
    getFilesSuccess,
    addFile
} = fileSlice.actions;

export default fileSlice.reducer;
