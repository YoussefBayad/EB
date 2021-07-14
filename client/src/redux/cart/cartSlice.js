import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCartOpen: false,
  data: [],
};

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
      const product = { ...action.payload, count: 1 };
      state.data.push(product);
    },
    removeFromCart(state, action) {
      state.data = state.data.filter(
        (product) => product.documentID !== action.payload
      );
    },
    increment(state, action) {
      const clickedProduct = state.data.find(
        (product) => product.documentID === action.payload
      );
      clickedProduct.count++;
    },
    decrement(state, action) {
      const clickedProduct = state.data.find(
        (product) => product.documentID === action.payload
      );
      // preventing count from negative values
      if (clickedProduct.count === 1) return;
      else {
        clickedProduct.count--;
      }
    },
    paymentCompleted(state, action) {
      state.data = []
      localStorage.setItem('cart',[])


    }
  },
});

export const {
  openCart,
  addToCart,
  increment,
  decrement,
  removeFromCart,
  setLocalStorageItems,
  paymentCompleted
} = cartSlice.actions;
export default cartSlice.reducer;
