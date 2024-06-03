import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const initialState = {
  loading: false,
  data: null,
  error: null,
  isLogged: false,
};

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (userData) => {
    try {
      const formData = new FormData();
      const { username, password, email, fullName, image } = userData;
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("fullName", fullName);
      formData.append("image", image);
      const res = await axios.post(
        "http://localhost:9000/user/signup",
        formData
      );
      const data = res.data;
      localStorage.setItem("Token", data);
      const decoded = jwtDecode(data);
      return decoded;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ userInfo, isRemember }) => {
    try {
      const res = await axios.post(
        "http://localhost:9000/user/signin",
        userInfo
      );
      const data = res.data;
      if (isRemember) {
        localStorage.setItem("Token", data);
      } else {
        sessionStorage.setItem("Token", data);
      }
      const decoded = jwtDecode(data);
      return decoded;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state) => {
      try {
        const token =
          localStorage.getItem("Token") || sessionStorage.getItem("Token");
        const decoded = jwtDecode(token);
        state.isLogged = true;
        state.data = decoded;
      } catch (error) {
        state.data = null;
        state.isLogged = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      state.isLogged = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });

    builder.addCase(signUpUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      state.isLogged = true;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });
  },
});

export const { setCredentials } = userSlice.actions;

export default userSlice.reducer;
