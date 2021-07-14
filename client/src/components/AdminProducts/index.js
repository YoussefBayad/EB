import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import AdminFilter from '../AdminFilter';
import CreatModal from '../CreateModel';
import Button from '../forms/Button';

const AdminProducts = ({ products, onDeleteProduct,setError }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  return (
    <>
    <AdminFilter
          initialState={products}
          products={filteredProducts}
          setProducts={setFilteredProducts}
    />
    
    <motion.div
      initial={{  opacity: 0 }}
      animate={{  opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="admin-products"
    >
      <AnimatePresence>
        {filteredProducts.map((product) => {
          const { name, price, documentID, photoURL } = product;
          return (
            <motion.div
            layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="admin-product"
              key={documentID}
            >
           <div className="image">
              <motion.img
                className="thumb"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}

                src={
                  photoURL ? photoURL : `/img/${name.replace(/\s/g, '')}.webp`
                }
                alt={name}
              />
              <CreatModal  initialValues={product}  task={"Edit Product"} setError={setError} />

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
