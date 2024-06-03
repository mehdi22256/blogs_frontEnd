import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  get: { loading: false, data: [], error: "" },
  put: { loading: false, data: [], error: "" },
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    return axios.get("http://localhost:9000/category").then((res) => res.data);
  }
);

export const fetchPutCategory = createAsyncThunk(
  "category/fetchPutCategory",
  async ({ blog, id, token }) => {
    try {
      const res = await axios.put(`http://localhost:9000/category${id}`, blog, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    // get
    builder.addCase(fetchCategories.pending, (state) => {
      state.get.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.get.loading = false;
      state.get.data = action.payload;
      state.get.error = "";
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.get.loading = false;
      state.get.error = action.error.message;
    });

    // put
    builder.addCase(fetchPutCategory.pending, (state) => {
      state.put.loading = true;
    });
    builder.addCase(fetchPutCategory.fulfilled, (state, action) => {
      state.put.loading = false;
      state.put.data = action.payload;
      state.put.error = "";
    });
    builder.addCase(fetchPutCategory.rejected, (state, action) => {
      state.put.loading = false;
      state.put.error = action.error.message;
    });
  },
});

export default categorySlice.reducer;
