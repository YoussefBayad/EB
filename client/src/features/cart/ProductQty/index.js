import React from 'react';
import { useDispatch } from 'react-redux';
import { decrement, increment } from '../../../redux/cart/cartSlice';
import './index.scss';

const ProductQty = ({ id, qty }) => {
  const dispatch = useDispatch();
  return (
    <div className='product-qty'>
      <button onClick={() => dispatch(increment(id))}>+</button>
      {qty}
      <button onClick={() => dispatch(decrement(id))}>-</button>
    </div>
  );
};

export default ProductQty;
