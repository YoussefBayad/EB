import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const CartFooter = ({ products, openCart }) => {
  const dispatch = useDispatch();
  return (
    <div className="cart-footer">
      <Link
        to="/payment"
        className="btn"
        onClick={() => {
          dispatch(openCart());
        }}
      >
        <span>CHECKOUT</span> <span>.</span>{' '}
        <span>
          $ {''}
          {products.length > 0
            ? products
                .reduce((a, p) => {
                  return a + p.price * p.count;
                }, 0)
                .toFixed(2)
            : '00.00 usd'}
        </span>
      </Link>
    </div>
  );
};

export default CartFooter;
