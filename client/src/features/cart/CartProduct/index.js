import React from 'react';
import { motion } from 'framer-motion';
import { removeFromCart } from '../../../redux/cart/cartSlice';
import ProductQty from '../../cart/ProductQty';
import RemoveProduct from '../RemoveProduct';
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
          product.imageURL
            ? product.imageURL
            : `/img/${product.name.replace(/\s/g, '')}.webp`
        }
        alt={product.name}
      />
      <div className='cart-product-description'>
        <p className='cart-product-name'>{product.name}</p>
        <p className='cart-product-price'>${product.price} usd</p>
        <div className='quantity'>
          <ProductQty id={product._id} qty={product.qty} />
          <RemoveProduct _id={product._id} removeFromCart={removeFromCart} />
        </div>
      </div>
    </motion.div>
  );
};

export default CartProduct;
