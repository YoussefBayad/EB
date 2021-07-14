import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openCart, addToCart } from '../../redux/cart/cartSlice';
import Button from '../forms/Button';

const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const isProductInCart = useSelector((state) =>
    state.cart.data.find((item) => item.documentID === product.documentID)
  );
  return (
    <>
      {isProductInCart === undefined ? (
        <Button
          className="buy-button"
          onClick={() => {
            dispatch(addToCart(product));
            dispatch(openCart());
          }}
        >
          Add To Cart
        </Button>
      ) : (
        <Button className="buy in-cart" onClick={() => dispatch(openCart())}>
          In Cart
        </Button>
      )}
    </>
  );
};

export default AddToCart;
