import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: null,
  loading: false,
  message: null,
};

// fetch a product
export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProduct.pending]: (state, action) => {
      state.loading = true;
      state.data = null;
      state.message = null;
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.message = null;
    },
    [fetchProduct.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.data = null;
    },
  },
});

export default productSlice.reducer;
