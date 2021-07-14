import React from 'react';
import { useDispatch } from 'react-redux';
import deleteIcon from '../../assets/icon/delete.svg';

function CartHeader({ openCart }) {
  const dispatch = useDispatch();
  return (
    <div className="cart-header">
      <h1>CART</h1>

      <img
        src={deleteIcon}
        alt="close cart"
        className="close-cart"
        onClick={() => {
          dispatch(openCart());
        }}
      />
    </div>
  );
}

export default CartHeader;
