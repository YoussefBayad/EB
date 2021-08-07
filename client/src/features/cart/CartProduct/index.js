import React from 'react';
import { motion } from 'framer-motion';
import { removeFromCart } from '../../../redux/cart/cartSlice';
import Count from '../../product/ProductCount';
import RemoveProduct from '../../../components/RemoveProduct';
import './index.scss';

const CartProduct = ({ product }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='cart-product'>
      <img
        className='cart-product-img'
        src={
          product.photoURL
            ? product.photoURL
            : `/img/${product.name.replace(/\s/g, '')}.webp`
        }
        alt={product.name}
      />
      <div className='cart-product-description'>
        <p className='cart-product-name'>{product.name}</p>
        <p className='cart-product-price'>${product.price} usd</p>
        <div className='quantity'>
          <Count id={product._id} count={product.count} />
          <RemoveProduct _id={product._id} removeFromCart={removeFromCart} />
        </div>
      </div>
    </motion.div>
  );
};

export default CartProduct;
