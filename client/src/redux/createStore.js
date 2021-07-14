import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import productsReducer from './Products/productsSlice';
import userReducer from './User/userSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    currentUser: userReducer,
  },
});
