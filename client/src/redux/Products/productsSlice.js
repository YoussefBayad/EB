import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firestore } from '../../Firebase/utils';

const initialState = {
 data: [],

  status: 'succeeded',
  error: null,
};
// [{
//   "documentID":1,
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
//  "documentID":2,

//  "photoURL": null,
//  "name": "Fuelbase™ Max Wireless Charging Pad",
//  "price": 59.99,
//  "category": "Battery",
//  "wireless": ""
// },
// {
//  "documentID":3,

//  "photoURL": null,
//  "name": "Fuelbase™ Wireless Charging Pad ",
//  "price": 39.99,
//  "category": "Battery",
//  "wireless": "",
//  "count": 0
// },

// {
//  "documentID":5,
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
  async () => {
    let productsRef = firestore.collection('products');
    let productsCollection = await productsRef
      .orderBy('createdAt', 'desc')
      .get();
    let products = [];
    for (const doc of productsCollection.docs) {
      products.push({ ...doc.data(), documentID: doc.id });
    }
    return products;
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product) => {
    var response = await firestore.collection('products').add(product);

    return response;
  }
);
export const editProduct = createAsyncThunk(
  'products/editProduct',
  async (values) => {
    console.log("edditing",values)
    var response = await firestore
      .collection('products')
      .doc(values.documentID)
      .update(values);

    return response;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (documentID) => {
    var response = await firestore
      .collection('products')
      .doc(documentID)
      .delete();

    return response;
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
      state.status = 'loading';
      state.error = null;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      if (action.payload.length === 0) {
        state.status = 'failed';
        state.error = 'Failed Reload';
      }

      if (state.status === 'loading') {
        state.data = action.payload;
        state.status = 'succeeded';
      }
    },
    [fetchProducts.rejected]: (state, action) => {
      if (state.status === 'loading' ) {
        state.status = 'failed';
        state.error = 'Failed Reload';
      }
    },
    [addProduct.pending]: (state, action) => {
      state.status = 'loading';
      // state.error = null;
    },
    [addProduct.fulfilled]: (state, action) => {
      // if (state.status === 'loading') {
      //   state.status = 'succeeded';
    },

    [addProduct.rejected]: (state, action) => {
      // if (state.status === 'loading') {
      //   state.status = 'failed';
      //   state.error = 'failed to add product try again';
      // }
    },
    [deleteProduct.pending]: (state, action) => {
      state.status = 'loading';
    },
    [deleteProduct.fulfilled]: (state, action) => {
      // if (state.status === 'loading') {
      //   state.status = 'succeeded';
      // }
    },
    [deleteProduct.rejected]: (state, action) => {
      // if (state.status === 'loading') {
      //   state.status = 'failed';
      //   state.error = 'failed to delete product try again';
      // }
    },
    [editProduct.pending]: (state, action) => {
      state.status = 'loading';
    },
    [editProduct.fulfilled]: (state, action) => {
      // if (state.status === 'loading') {
      //   state.status = 'succeeded';
      // }
    },
    [editProduct.rejected]: (state, action) => {
      // if (state.status === 'loading') {
      //   state.status = 'failed';
      //   state.error = 'failed to delete product try again';
      // }
    },
  },
});

export const { latest, lowest, highest } = productsSlice.actions;

export default productsSlice.reducer;
