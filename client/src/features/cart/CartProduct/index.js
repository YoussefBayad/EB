import React from 'react';
import { motion } from 'framer-motion';
import { removeFromCart } from '../../../redux/cart/cartSlice';
import ProductQty from '../../cart/ProductQty';
import RemoveProduct from '../RemoveProduct';
import { Link } from 'react-router-dom';
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
      <Link to={`/shop/product/${product._id}`}>
        <img
          className='cart-product-img'
          src={
            product.imageUrl
              ? `http://localhost:5000${product.imageUrl}`
              : `/img/${product.name.replace(/\s/g, '')}.webp`
          }
          alt={product.name}
        />
      </Link>
      <div className='cart-product-description'>
        <Link to={`/shop/product/${product._id}`}>
          <p className='cart-product-name'>{product.name}</p>
        </Link>
        <p className='cart-product-price'>${product.price} usd</p>
        <div className='quantity'>
          <ProductQty
            id={product._id}
            qty={product.qty}
            countInStock={product.countInStock}
          />
          <RemoveProduct _id={product._id} removeFromCart={removeFromCart} />
        </div>
      </div>
    </motion.div>
  );
};

export default CartProduct;
