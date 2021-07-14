import React from 'react';
import { useDispatch } from 'react-redux';
import { decrement, increment } from '../../redux/cart/cartSlice';
import './index.scss';

const Count = ({ id, count }) => {
  const dispatch = useDispatch();
  return (
    <div className="count">
      <button onClick={() => dispatch(increment(id))}>+</button>
      {count}
      <button onClick={() => dispatch(decrement(id))}>-</button>
    </div>
  );
};

export default Count;
