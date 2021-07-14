import React from 'react';
import { useDispatch } from 'react-redux';

const RemoveProduct = ({ documentID, removeFromCart }) => {
  const dispatch = useDispatch();

  return (
    <h5
      className="cart-remove-product"
      onClick={() => dispatch(removeFromCart(documentID))}
    >
      REMOVE
    </h5>
  );
};

export default RemoveProduct;
