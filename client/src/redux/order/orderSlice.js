import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import header from '../../utils/header';

const initialState = {
  data: {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: null,
    itemsPrice: null,
    shippingPrice: null,
    taxPrice: null,
  },
  loading: false,
  message: null,
};

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
  },
});

export default orderSlice.reducer;
