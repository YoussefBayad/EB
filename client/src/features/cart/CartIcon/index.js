import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openCart } from '../../redux/cart/cartSlice';
import cartIcon from '../../assets/icon/cart.svg';

const CartIcon = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.data);

  return (
    <div
      className="cart-icon"
      onClick={() => {
        dispatch(openCart());
      }}
    >
      <img src={cartIcon} alt="cart icon" />
      <p className="cart-items-number">{products.length}</p>
    </div>
  );
};

export default CartIcon;
