import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLocalStorageItems, openCart } from '../../redux/cart/cartSlice';
import CartHeader from '../CartHeader';
import CartMain from '../CartMain';
import CartFooter from '../CartFooter';
import useOutsideClickRef from '@rooks/use-outside-click-ref';
import './index.scss';
import { AnimatePresence, motion } from 'framer-motion';

const Cart = () => {
  const dispatch = useDispatch();
  const { isCartOpen, data: products } = useSelector((state) => state.cart);

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
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(products));
  });
  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="overlay"
          />
          <motion.div
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: 1000 }}
            transition={{ duration: 0.5 }}
            ref={ref}
            className="cart"
          >
            <CartHeader openCart={openCart} />
            <CartMain products={products} />
            <CartFooter products={products} openCart={openCart} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
