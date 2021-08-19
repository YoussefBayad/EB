import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import header from '../../utils/header';

const initialState = {
  data: null,
  loading: true,
  message: null,
};

// add order thunk

export const addOrder = createAsyncThunk(
  'products/addOrder',
  async (order, { rejectWithValue }) => {
    console.log('order', order);
    try {
      const { data } = await axios.post('/order', { order }, header);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// get order thunk

export const getOrder = createAsyncThunk(
  'products/getOrder',
  async (id, { rejectWithValue }) => {
    console.log('order id', id);
    try {
      const { data } = await axios.get(`/order/${id}`, header);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//update order thunk
export const updateOrderToPaid = createAsyncThunk(
  'products/updateOrderToPaid',
  async ({ id, paymentResult }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/order/${id}/pay`,
        paymentResult,
        header
      );
      console.log('data', data);

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: {
    [addOrder.pending]: (state, action) => {
      state.loading = true;
      state.data = null;
      state.message = 'we are processing your request';
    },
    [addOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.message = 'your order has been added successfully';
    },
    [addOrder.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.data = null;
    },
    [getOrder.pending]: (state, action) => {
      state.loading = true;
      state.data = null;
      state.message = 'we are processing your request';
    },
    [getOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.message = 'your order has been added successfully';
    },
    [getOrder.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.data = null;
    },
    [updateOrderToPaid.pending]: (state, action) => {
      state.loading = true;
      state.data = null;
      state.message = 'we are processing your request';
    },
    [updateOrderToPaid.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.message = 'your order has been added successfully';
    },
    [updateOrderToPaid.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.data = null;
    },
  },
});

export default orderSlice.reducer;
