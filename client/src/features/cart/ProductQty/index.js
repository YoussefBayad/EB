import React from 'react';
import { useDispatch } from 'react-redux';
import { decrement, increment } from '../../../redux/cart/cartSlice';
import './index.scss';

const ProductQty = ({ id, qty, countInStock }) => {
  const dispatch = useDispatch();

  // incremet product qty but not more than count in stock
  const incrementQty = () => {
    if (qty === countInStock) return;
    dispatch(increment(id));
  };

  return (
    <div className='product-qty'>
      <button onClick={incrementQty}>+</button>
      {qty}
      <button onClick={() => dispatch(decrement(id))}>-</button>
    </div>
  );
};

export default ProductQty;
