import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLocalStorageItems, openCart } from '../../../redux/cart/cartSlice';
import Header from '../Header';
import Footer from '../Footer';
import useOutsideClickRef from '@rooks/use-outside-click-ref';
import { AnimatePresence, motion } from 'framer-motion';
import CartProduct from '../CartProduct';
import './index.scss';

const Cart = () => {
  const dispatch = useDispatch();
  const {
    isCartOpen,
    loading,
    message,
    data: products,
  } = useSelector((state) => state.cart);

  const handleOutsideClick = (e) => {
    if (e.target.className === 'cart-remove-product') return;
    if (isCartOpen) {
      dispatch(openCart());
    }
  };
  const [ref] = useOutsideClickRef(handleOutsideClick);

  useEffect(() => {
    const data = localStorage.getItem('cart');
    if (data) {
      dispatch(setLocalStorageItems(JSON.parse(data)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(products));
  }, [products]);
  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className='overlay'
          />
          <motion.div
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: 1000 }}
            transition={{ duration: 0.5 }}
            ref={ref}
            className='cart'>
            <Header openCart={openCart} />
            <div className='cart-main'>
              {products.length === 0 && <p>Your cart is empty</p>}
              <AnimatePresence>
                {products.map((product) => (
                  <CartProduct key={product._id} product={product} />
                ))}
              </AnimatePresence>
            </div>{' '}
            <Footer products={products} openCart={openCart} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
