import React from 'react';
import { useDispatch } from 'react-redux';

const RemoveProduct = ({ _id, removeFromCart }) => {
  const dispatch = useDispatch();

  return (
    <h5
      className='cart-remove-product'
      onClick={() => dispatch(removeFromCart(_id))}>
      REMOVE
    </h5>
  );
};

export default RemoveProduct;
