import React from 'react';

import Product from '../Product';
import Spinner from '../../../components/Spinner';
import ErrorMessage from '../../../components/ErrorMessage';
import './index.scss';

const Products = ({ data: products, loading, message }) => {
  return (
    <div className='products'>
      <Spinner loading={loading} style={{ margin: '20rem auto' }} />
      {products &&
        products.map((product) => (
          <Product product={product} key={product._id} />
        ))}

      {message && <ErrorMessage>{message}</ErrorMessage>}
    </div>
  );
};

export default Products;
