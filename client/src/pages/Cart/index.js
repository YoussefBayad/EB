import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { setLocalStorageItems } from '../../redux/cart/cartSlice';
import CartProduct from '../../features/cart/CartProduct';
import { Link } from 'react-router-dom';
import './index.scss';

const Cart = () => {
  let products = useSelector((state) => state.cart.data);

  // total price
  const total =
    products.length > 0 &&
    products
      .reduce((a, p) => {
        return a + p.price * p.qty;
      }, 0)
      .toFixed(2);
  // total items
  const totalItems = products.length;

  return (
    <div className='cart-page'>
      <h1 className='title'>Shopping Cart :</h1>
      <div className='cart-page-inner'>
        <div className='cart-page-products'>
          {products.length === 0 ? (
            <>
              <h3 className='empty-cart'>Your cart is empty ...</h3>
              <Link className='in-cart' to='/shop'>
                Back To Shop
              </Link>
            </>
          ) : (
            <AnimatePresence>
              {products.map((product) => (
                <CartProduct key={product._id} product={product} />
              ))}
            </AnimatePresence>
          )}
        </div>
        <div className='checkout'>
          <h1 className='title'>ORDER SUMMARY </h1>
          <div className='total-items'>
            <p className='text'>Total items </p>
            <p className='price'>{totalItems}</p>
          </div>
          <div className='shipping-cost'>
            <p className='text'>Shipping </p>
            <p className='price'>$00.00</p>
          </div>
          <div className='total-price'>
            <p className='text'>Total </p>
            <p className='price'>${total}</p>
          </div>
          <Link to='/shipping' className='btn checkout-btn'>
            Place Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
