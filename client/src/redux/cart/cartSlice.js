import { createSlice } from '@reduxjs/toolkit';

// get data from cart
const data = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];

const shippingData = localStorage.getItem('shippingData')
  ? JSON.parse(localStorage.getItem('shippingData'))
  : null;

const paymentMethod = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : null;

const initialState = {
  isCartOpen: false,
  data,
  loading: false,
  message: null,
  shippingData,
  paymentMethod,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
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
    saveShippingData(state, action) {
      state.shippingData = action.payload;
      localStorage.setItem('shippingData', JSON.stringify(action.payload));
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
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
  saveShippingData,
  savePaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;
