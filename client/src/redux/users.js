import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import header from '../utils/header';

const initialState = {
  users: null,
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
export const editUser = createAsyncThunk(
  'users/editUser',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/auth/${user._id}`, { user }, header);
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
    [deleteUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = null;
      state.data = state.data.filter((user) => user._id !== action.payload.id);
    },
    [updateUsers.fulfilled]: (state, action) => {
      state.data = state.data.map((user) => {
        if (user._id === action.payload.user._id) user = action.payload.user;
        return user;
      });
      state.loading = false;
      state.message = null;
    },
  },
});

export default usersSlice.reducer;
