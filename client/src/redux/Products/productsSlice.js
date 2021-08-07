import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import header from '../../utils/header';

const initialState = {
  data: [
    {
      _id: 1,
      photoURL: null,
      name: ' Strong Push™ Ultra True Wireless Earbuds with Print  ',
      price: 129.99,
      category: 'Earbuds',
      wireless: 'true',
      wirelessCharging: 'true',
      totalCharge: '24',
      waterProof: 'true',
      fullControl: 'true',
      eitherBudSolo: 'true',
      tile: 'true',
      count: 0,
    },
    {
      _id: 2,

      photoURL: null,
      name: 'Fuelbase™ Max Wireless Charging Pad',
      price: 59.99,
      category: 'Battery',
      wireless: '',
    },
    {
      _id: 3,

      photoURL: null,
      name: 'Fuelbase™ Wireless Charging Pad ',
      price: 39.99,
      category: 'Battery',
      wireless: '',
      count: 0,
    },

    {
      _id: 5,
      photoURL: null,
      name: 'Hesh 2 Over-Ear Wireless Headphone ',
      price: 99,
      category: 'Headphone',
      wireless: 'true',
      wirelessCharging: 'false',
      totalCharge: '30',
      waterProof: 'true',
      fullControl: 'true',
      eitherBudSolo: 'true',
      tile: 'true',
      count: 0,
    },
  ],
  loading: false,
  message: null,
};
// [{
//   "_id":1,
//  "photoURL": null,
//  "name": " Strong Push™ Ultra True Wireless Earbuds with Print  ",
//  "price": 129.99,
//  "category": "Earbuds",
//  "wireless": "true",
//  "wirelessCharging": "true",
//  "totalCharge": "24",
//  "waterProof": "true",
//  "fullControl": "true",
//  "eitherBudSolo": "true",
//  "tile": "true",
//  "count": 0
// },
// {
//  "_id":2,

//  "photoURL": null,
//  "name": "Fuelbase™ Max Wireless Charging Pad",
//  "price": 59.99,
//  "category": "Battery",
//  "wireless": ""
// },
// {
//  "_id":3,

//  "photoURL": null,
//  "name": "Fuelbase™ Wireless Charging Pad ",
//  "price": 39.99,
//  "category": "Battery",
//  "wireless": "",
//  "count": 0
// },

// {
//  "_id":5,
//  "photoURL": null,
//  "name": "Hesh 2 Over-Ear Wireless Headphone ",
//  "price": 99,
//  "category": "Headphone",
//  "wireless": "true",
//  "wirelessCharging": "false",
//  "totalCharge": "30",
//  "waterProof": "true",
//  "fullControl": "true",
//  "eitherBudSolo": "true",
//  "tile": "true",
//  "count": 0
// },],
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ rejectWithValue }) => {
    try {
      const { data } = await axios.get('/products');
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
      const { data } = await axios.post('/products', product, header);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const editProduct = createAsyncThunk(
  'products/editProduct',
  async (newData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put('/products', newData, header);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete('/products', productId, header);
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
      state.data.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
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
      state.message = 'your product has been add successfully';
      state.data.push(action.payload);
      state.data.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
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
      state.message = 'product has been deleted successfully';
      state.data = state.data.filter(
        (product) => product._id !== action.payload.productId
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
      state.loading = false;
      state.data = state.data.map((product) => {
        if (product._id === action.payload.product._id)
          product.content = action.payload.product.content;
      });
      state.message = 'product has been updated';
    },
    [editProduct.rejected]: (state, action) => {
      state.message = action.payload.message;
    },
  },
});

export const { latest, lowest, highest } = productsSlice.actions;

export default productsSlice.reducer;
