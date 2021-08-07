import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import AdminSearch from '../AdminSearch';
import CreatModal from '../CreateModel';
import Button from '../forms/Button';

const AdminProducts = ({ products, onDeleteProduct, setError }) => {
  const [searchedProducts, setSearchedProducts] = useState(products);

  return (
    <>
      <AdminSearch
        initialState={products}
        products={searchedProducts}
        setProducts={setSearchedProducts}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className='admin-products'>
        <AnimatePresence>
          {searchedProducts.map((product) => {
            const { name, price, _id, photoURL } = product;
            return (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className='admin-product'
                key={_id}>
                <div className='image'>
                  <motion.img
                    className='thumb'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    src={
                      photoURL
                        ? photoURL
                        : `/img/${name.replace(/\s/g, '')}.webp`
                    }
                    alt={name}
                  />
                  <CreatModal
                    initialValues={product}
                    task={'Edit Product'}
                    setError={setError}
                  />
                </div>
                <h2>{name}</h2>
                <h2>${price}</h2>
                <Button onClick={() => onDeleteProduct(product)}>Delete</Button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default AdminProducts;
