import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./users/userSlice";
import blogSlice from "./blogs/blogSlice";
import categorySlice from "./categories/categorySlice";
import commentSlice from "./comments/commentSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    blog: blogSlice,
    category: categorySlice,
    comment: commentSlice,
  },
});

export default store;
