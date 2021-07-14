import React from 'react';

import Product from '../Product';
import Spinner from '../Spinner';

import './index.scss';

const Products = ({ data: products, status }) => {
  return (
    <div className="products">
      {status === 'succeeded' &&
        products.map((product) => (
          <Product product={product} key={product.documentID} />
        ))}
      <Spinner status={status} style={{ margin: '20rem auto' }} />

      {status === 'failed' && <h1>Failed Reload </h1>}
    </div>
  );
};

export default Products;
