import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import header from '../../utils/header';

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

// add review
export const addReview = createAsyncThunk(
  'products/addReview',
  async ({ review, productId }, { rejectWithValue }) => {
    try {
      console.log('review', review);

      const { data } = await axios.post(
        `/products/${productId}/reviews`,
        { review },
        header
      );
      console.log('data', data);

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
    // [addReview.pending]: (state, action) => {
    //   state.loading = true;
    //   state.data = null;
    //   state.message = null;
    // },
    [addReview.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.data.reviews.push(action.payload);
      state.data.numReviews = state.data.reviews.length;

      state.data.rating =
        state.data.reviews.reduce((acc, item) => item.rating + acc, 0) /
        state.data.reviews.length;
    },
    // [addReview.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.message = action.payload;
    //   state.data = null;
    // },
  },
});

export default productSlice.reducer;
