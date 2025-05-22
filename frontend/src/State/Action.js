import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
//import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;

//✅ Get token from localStorage on app start
const token = localStorage.getItem("accessToken");
// ✅ Initial state
const initialState = {
  user: null,
  status: "idle",
  error: null,
  isLoggedIn: !!token, // true if token exists
};
// ✅ Register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        userData
      );

      const token = response.data.token;
      if (token) {
        localStorage.setItem("accessToken", token);
      }

      toast.success("User registered successfully! Please verify your email.", {
        position: "top-center",
      });

      dispatch(loadUserFromToken()); // Now works

      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!", {
        position: "top-center",
      });
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        userData
      );
      const { token } = response.data;

      localStorage.setItem("accessToken", token);

      // ✅ Dispatch loadUserFromToken right after login
      dispatch(loadUserFromToken());

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//get profiole
export const loadUserFromToken = createAsyncThunk(
  "auth/loadUserFromToken",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    console.log("token", token);
    if (!token) return rejectWithValue("No token found");

    try {
      const response = await axios.get("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // your user profile data
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ✅ Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("accessToken");
      state.user = null;
      state.status = "idle";
      state.error = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message;
      })
      // Load User From Token
      .addCase(loadUserFromToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserFromToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loadUserFromToken.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isLoggedIn = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
