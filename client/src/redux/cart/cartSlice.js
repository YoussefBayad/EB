import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import header from '../../utils/header';

const initialState = {
  isCartOpen: false,
  data: [],
  loading: false,
  message: null,
};

export const saveShippingData = createAsyncThunk(
  'cart/saveShippingData',
  async (id, { rejectWithValue }) => {
    // try {
    //   const { data } = await axios.get(`/cart/${id}`);
    //   return data;
    // } catch (err) {
    //   return rejectWithValue(err.response.data);
    // }
  }
);
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/cart/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  'cart/addProduct',
  async ({ userId, product }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        '/cart/${userId} ',
        { product },
        header
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editProductInCart = createAsyncThunk(
  'cart/editProduct',
  async ({ userId, product }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/cart/${userId}`, { product }, header);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProductFromCart = createAsyncThunk(
  'cart/deleteProduct',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/products/${productId}`, header);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLocalStorageItems(state, action) {
      state.data = action.payload;
    },
    openCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    addToCart(state, action) {
      const product = action.payload;
      state.data.push(product);
    },
    removeFromCart(state, action) {
      state.data = state.data.filter(
        (product) => product._id !== action.payload
      );
    },
    increment(state, action) {
      const clickedProduct = state.data.find(
        (product) => product._id === action.payload
      );
      clickedProduct.qty++;
    },
    decrement(state, action) {
      const clickedProduct = state.data.find(
        (product) => product._id === action.payload
      );
      // preventing qty from negative values
      if (clickedProduct.qty === 1) return;
      else {
        clickedProduct.qty--;
      }
    },
    paymentCompleted(state, action) {
      state.data = [];
      localStorage.setItem('cart', []);
    },
  },
});

export const {
  openCart,
  addToCart,
  increment,
  decrement,
  removeFromCart,
  setLocalStorageItems,
  paymentCompleted,
} = cartSlice.actions;
export default cartSlice.reducer;
