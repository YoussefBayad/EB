import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import productsReducer from './Products/productsSlice';
import authReducer from './Auth/authSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    auth: authReducer,
  },
});
