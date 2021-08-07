import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './index.scss';
import AddToCart from '../../cart/AddToCart';

const Product = ({ product }) => {
  return (
    <motion.div
      layout
      initial={{ scale: 0, y: 400 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 1 }}
      whileTap={{ scale: 0.9 }}
      className='product'>
      <Link to={`/shop/product/${product._id}`}>
        <img
          src={
            product.photoURL
              ? product.photoURL
              : `/img/${product.name.replace(/\s/g, '')}.webp`
          }
          alt={product.name.replace(/\s/g, '')}
        />
        <p>{product.name}</p>
        <p className='price'>${product.price}</p>
      </Link>
      <AddToCart product={product} />
    </motion.div>
  );
};

export default Product;
