import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openCart, addToCart } from '../../../redux/cart/cartSlice';
import Button from '../../../components/forms/Button';
import { Link } from 'react-router-dom';

const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const isProductInCart = useSelector((state) =>
    state.cart.data.find((item) => item._id === product._id)
  );
  return (
    <>
      {!isProductInCart ? (
        <Button
          className='buy-button'
          onClick={() => {
            dispatch(addToCart(product));
            dispatch(openCart());
          }}>
          Add To Cart
        </Button>
      ) : (
        <div className='product-in-cart'>
          <Link className='in-cart' to='/cart'>
            Go To Cart
          </Link>
          <br />
          <p>or</p>
          <br />
          <Link className='in-cart' to='/shop'>
            Back To Shop
          </Link>
        </div>
      )}
    </>
  );
};

export default AddToCart;
