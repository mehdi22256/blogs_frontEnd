import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  get: { loading: false, data: [], error: "" },
  create: { loading: false, data: [], error: "" },
};

export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async () => {
    try {
      return axios.get("http://localhost:9000/comment").then((res) => res.data);
    } catch (error) {
      return console.log(error);
    }
  }
);

export const fetchSendComments = createAsyncThunk(
  "comment/fetchSendComments",
  async ({ post, token }) => {
    try {
      const res = await axios.post("http://localhost:9000/comment", post, {
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

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.get.loading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.get.loading = false;
      state.get.data = action.payload;
      state.get.error = "";
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.get.loading = false;
      state.get.error = action.error.message;
    });

    builder.addCase(fetchSendComments.pending, (state) => {
      state.create.loading = true;
    });
    builder.addCase(fetchSendComments.fulfilled, (state, action) => {
      state.create.loading = false;
      state.create.data = action.payload;
      state.create.error = "";
    });
    builder.addCase(fetchSendComments.rejected, (state, action) => {
      state.create.loading = false;
      state.create.error = action.error.message;
    });
  },
});

export default commentSlice.reducer;
