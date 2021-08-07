import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import header from '../../utils/header';
const initialState = {
  productDetails: [],
  loading: false,
  message: null,
};

// fetch a product
export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (ProductId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/products/${ProductId}`, header);
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
      state.productDetails = null;
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.productDetails = action.payload;
      state.error = null;
    },
    [fetchProduct.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.productDetails = null;
    },
  },
});

export default productSlice.reducer;
