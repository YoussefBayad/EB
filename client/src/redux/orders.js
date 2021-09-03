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
  async (id, { rejectWithValue }) => {
    try {
      if (id) {
        const { data } = await axios.get(`order/${id}/userOrders`, header);
        console.log(data);
        return data;
      } else {
        const { data } = await axios.get('/order/', header);
        console.log(data);
        return data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

// // user  orders thunk
// export const getUserOrders = createAsyncThunk(
//   'orders/getOrders',
//   async (id, { rejectWithValue }) => {
//     try {
//       console.log(data);
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.response.data.error);
//     }
//   }
// );

// update Order To Delivered
export const updateOrderToDelivered = createAsyncThunk(
  'orders/updateOrderToDelivered',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/order/${id}/delivered`, header);
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
    [updateOrderToDelivered.fulfilled]: (state, action) => {
      state.data = state.data.map((order) => {
        if (order._id === action.payload.id) order.isDelivered = true;
        order.deliveredAt = action.payload.deliveredAt;
        return order;
      });
      state.loading = false;
      state.message = null;
    },
  },
});

export default ordersSlice.reducer;
