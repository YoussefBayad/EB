import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import header from '../../utils/header';

const initialState = {
  data: [],
  loading: false,
  message: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (keyword = '', { rejectWithValue }) => {
    let source;

    if (typeof source != typeof undefined) {
      source.cancel('cancel keyword search');
    }
    source = axios.CancelToken.source();

    try {
      const { data } = await axios.get(`/products?keyword=${keyword}`, {
        cancelToken: source.token,
      });

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product, { rejectWithValue }) => {
    try {
      console.log('product', product);

      const { data } = await axios.post('/products', { product }, header);
      console.log('data', data);

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async (product, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/products/${product._id}`,
        { product },
        header
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/products/${id}`, header);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    latest(state) {
      state.data.sort((a, b) => (a.created < b.created ? 1 : -1));
    },
    lowest(state) {
      state.data.sort((a, b) => (a.price > b.price ? 1 : -1));
    },
    highest(state) {
      state.data.sort((a, b) => (a.price < b.price ? 1 : -1));
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
      state.message = null;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      if (!action.payload) return;
      state.loading = false;
      state.data = action.payload;
      state.data.sort((a, b) => (a.created < b.created ? 1 : -1));

      state.message = null;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    [addProduct.pending]: (state, action) => {
      state.loading = false;
      state.message = 'we are processing your request';
    },
    [addProduct.fulfilled]: (state, action) => {
      if (!action.payload) return;
      state.loading = false;
      state.message = action.payload.message;
      state.data.push(action.payload.product);
      state.data.sort((a, b) => (a.created < b.created ? 1 : -1));
    },
    [addProduct.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    [deleteProduct.pending]: (state, action) => {
      state.loading = false;
      state.message = 'we are processing your request';
    },
    [deleteProduct.fulfilled]: (state, action) => {
      if (!action.payload) return;
      state.message = action.payload.message;
      state.data = state.data.filter(
        (product) => product._id !== action.payload.id
      );
    },
    [deleteProduct.rejected]: (state, action) => {
      state.message = action.payload.message;
    },
    [editProduct.pending]: (state, action) => {
      state.loading = false;
      state.message = 'we are processing your request';
    },
    [editProduct.fulfilled]: (state, action) => {
      console.log(action.payload.product);
      state.data = state.data.map((product) => {
        if (product._id === action.payload.product._id)
          product = action.payload.product;
        return product;
      });

      state.loading = false;
      state.message = action.payload.message;
    },
    [editProduct.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
  },
});

export const { latest, lowest, highest } = productsSlice.actions;

export default productsSlice.reducer;
