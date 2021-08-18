import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const CartFooter = ({ total, openCart }) => {
  const dispatch = useDispatch();
  return (
    <div className='cart-footer'>
      <Link
        to='/payment'
        className='btn checkout-btn'
        onClick={() => {
          dispatch(openCart());
        }}>
        <span>CHECKOUT</span>{' '}
        <span>
          ${''}
          {total ? total : '00.00'}
        </span>
      </Link>
      <Link
        className='cart-remove-product'
        to='/cart'
        onClick={() => {
          dispatch(openCart());
        }}>
        {' '}
        View cart
      </Link>
    </div>
  );
};

export default CartFooter;
