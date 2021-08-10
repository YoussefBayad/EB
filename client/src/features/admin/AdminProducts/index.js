import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
// import AdminSearch from '../AdminSearch';
import Button from '../../../components/forms/Button';
import EditProduct from '../EditProduct';
const AdminProducts = ({ products, onDeleteProduct, setError }) => {
  // const [searchedProducts, setSearchedProducts] = useState(products);

  return (
    <>
      {/* <AdminSearch
        initialState={products}
        products={searchedProducts}
        setProducts={setSearchedProducts}
      /> */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className='admin-products'>
        <AnimatePresence>
          {products.map((product) => {
            const { name, price, _id, imageURL } = product;
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
                      imageURL
                        ? imageURL
                        : `/img/${name.replace(/\s/g, '')}.webp`
                    }
                    alt={name}
                  />
                  <EditProduct
                    initialValues={product}
                    task={'Edit Product'}
                    setError={setError}
                  />
                </div>
                <h2>{name}</h2>
                <h2>${price}</h2>
                <Button
                  className='btn delete-product'
                  onClick={() => onDeleteProduct(_id)}>
                  Delete
                </Button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default AdminProducts;
