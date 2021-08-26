import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import header from '../utils/header';

const initialState = {
  data: null,
  loading: false,
  message: null,
};

// orders thunk
export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (order, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/order/', header);
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

// edit Order
export const editOrder = createAsyncThunk(
  'orders/editOrder',
  async (order, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/order/${order._id}`,
        { order },
        header
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/order/${id}`, header);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,

  extraReducers: {
    [getOrders.pending]: (state, action) => {
      state.loading = true;
      state.message = null;
      state.data = null;
    },
    [getOrders.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.message = null;
    },
    [getOrders.rejected]: (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.data = null;
    },
    [deleteOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = null;
      state.data = state.data.filter(
        (order) => order._id !== action.payload.id
      );
    },
    [editOrder.fulfilled]: (state, action) => {
      state.data = state.data.map((order) => {
        if (order._id === action.payload.order._id)
          order = action.payload.order;
        return order;
      });
      state.loading = false;
      state.message = null;
    },
  },
});

export default ordersSlice.reducer;
