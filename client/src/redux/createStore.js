import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import productsReducer from './products/productsSlice';
import productReducer from './productDetails/productDetailsSlice';
import authReducer from './auth/authSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
    productDetails: productReducer,
  },
});
