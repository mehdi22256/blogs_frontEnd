import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  get: { loading: false, data: null, error: null },
  getBlogs: { loading: false, data: null, error: null },
  details: { loading: false, data: null, error: null },
  create: { loading: false, data: null, error: null },
};

export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async () => {
  return await axios.get("http://localhost:9000/blog").then((res) => res.data);
});

export const fetchCreate = createAsyncThunk(
  "blog/fetchCreate",
  async ({ post, token }) => {
    try {
      const formData = new FormData();
      const { title, content, introduction, timeOfReading, image, category } =
        post;
      formData.append("title", title);
      formData.append("content", content);
      formData.append("introduction", introduction);
      formData.append("timeOfReading", timeOfReading);
      formData.append("image", image);
      formData.append("category", category);
      const response = await axios.post(
        "http://localhost:9000/blog",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const fetchBlog = createAsyncThunk("blog/fetchBlog", async (id) => {
  return await axios
    .get(`http://localhost:9000/category/${id}`)
    .then((res) => res.data);
});
export const fetchDetails = createAsyncThunk(
  "blog/fetchDetails",
  async (_id) => {
    return await axios
      .get(`http://localhost:9000/blog/${_id}`)
      .then((res) => res.data);
  }
);

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  extraReducers: (builder) => {
    // fetchBlogs
    builder.addCase(fetchBlogs.pending, (state) => {
      state.get.loading = true;
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.get.loading = false;
      state.get.data = action.payload;
      state.get.error = null;
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.get.loading = false;
      state.get.error = action.payload || action.error.message;
    });

    // fetchBlog
    builder.addCase(fetchBlog.pending, (state) => {
      state.getBlogs.loading = true;
    });
    builder.addCase(fetchBlog.fulfilled, (state, action) => {
      state.getBlogs.loading = false;
      state.getBlogs.data = action.payload;
      state.getBlogs.error = null;
    });
    builder.addCase(fetchBlog.rejected, (state, action) => {
      state.getBlogs.loading = false;
      state.getBlogs.error = action.payload || action.error.message;
    });

    // fetchDetails
    builder.addCase(fetchDetails.pending, (state) => {
      state.details.loading = true;
    });
    builder.addCase(fetchDetails.fulfilled, (state, action) => {
      state.details.loading = false;
      state.details.data = action.payload;
      state.details.error = null;
    });
    builder.addCase(fetchDetails.rejected, (state, action) => {
      state.details.loading = false;
      state.details.error = action.payload || action.error.message;
    });

    // fetchCreate
    builder.addCase(fetchCreate.pending, (state) => {
      state.create.loading = true;
    });
    builder.addCase(fetchCreate.fulfilled, (state, action) => {
      state.create.loading = false;
      state.create.data = action.payload;
      state.create.error = null;
    });
    builder.addCase(fetchCreate.rejected, (state, action) => {
      state.create.loading = false;
      state.create.error = action.payload || action.error.message;
    });
  },
});

export default blogSlice.reducer;
