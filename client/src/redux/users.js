import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import header from '../utils/header';

const initialState = {
  data: null,
  loading: false,
  message: null,
};

// users thunk
export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/auth/', header);
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

// edit user
export const setUserAsAdmin = createAsyncThunk(
  'users/setUserAsAdmin',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/auth/${id}/setAsAdmin`, {}, header);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/auth/${id}`, header);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,

  extraReducers: {
    [getUsers.pending]: (state, action) => {
      state.loading = true;
      state.message = null;
      state.data = null;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.message = null;
    },
    [getUsers.rejected]: (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.data = null;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = null;
      state.data = state.data.filter((user) => user._id !== action.payload);
    },
    [setUserAsAdmin.fulfilled]: (state, action) => {
      state.data = state.data.map((user) => {
        if (user._id === action.payload.id)
          user.isAdmin = action.payload.isAdmin;
        return user;
      });
      state.loading = false;
      state.message = null;
    },
  },
});

export default usersSlice.reducer;
