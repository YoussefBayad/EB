import { AnimatePresence } from 'framer-motion';
import React from 'react';
import CartProduct from '../CartProduct';

const CartMain = ({ products }) => {
  return (
    <div className="cart-main">
      <AnimatePresence>
        {products.map((product) => (
          <CartProduct key={product.documentID} product={product} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CartMain;
