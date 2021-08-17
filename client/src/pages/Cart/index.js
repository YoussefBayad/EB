import React from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import CartProduct from '../../features/cart/CartProduct';
import CheckoutSummary from '../../components/CheckoutSummary';
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
        {products.length > 0 && (
          <CheckoutSummary total={total} totalItems={totalItems}>
            <Link to='/shipping' className='btn checkout-btn'>
              Proceed to Checkout
            </Link>
          </CheckoutSummary>
        )}
      </div>
    </div>
  );
};

export default Cart;
