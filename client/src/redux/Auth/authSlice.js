import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// grab token and form header
const token = JSON.parse(localStorage.getItem('user'))?.token;
const header = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  message: null,
};

// register thunk
export const register = createAsyncThunk(
  'user/register',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/register', user);
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// login thunk
export const login = createAsyncThunk(
  'user/login',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login', user);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//edit user info thunk
export const editUserInfo = createAsyncThunk(
  'user/editUserInfo',
  async (newUserInfo, { rejectWithValue }) => {
    try {
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state, action) {
      localStorage.removeItem('user');
      state.user = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
      state.message = null;
      state.user = null;
    },
    [login.fulfilled]: (state, action) => {
      if (!action.payload) return;
      state.user = action.payload.user;
      state.loading = false;
      state.message = null;
    },
    [login.rejected]: (state, action) => {
      if (!action.payload) return;
      state.message = action.payload;
      state.loading = false;
      state.user = null;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
      state.message = null;
      state.user = null;
    },
    [register.fulfilled]: (state, action) => {
      if (!action.payload) return;
      state.user = action.payload.user;
      state.loading = false;
      state.message = null;
    },
    [register.rejected]: (state, action) => {
      if (!action.payload) return;
      state.message = action.payload;
      state.loading = false;
      state.user = null;
    },
  },
});

export const { authChange } = authSlice.actions;

export default authSlice.reducer;
