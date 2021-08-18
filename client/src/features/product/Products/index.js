import React from 'react';

import Product from '../Product';
import Spinner from '../../../components/Spinner';
import ErrorMessage from '../../../components/ErrorMessage';
import Skeleton from 'react-loading-skeleton';
import './index.scss';

const Products = ({ data: products, loading, message }) => {
  return (
    <div className='products'>
      {!loading ? (
        products?.map((product) => (
          <Product product={product} key={product._id} />
        ))
      ) : (
        <>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((ske) => (
            <div>
              <Skeleton height={250} width={300} style={{ margin: 10 }} />
              <Skeleton width={300} />
              <Skeleton width={300} />
              <Skeleton height={30} width={80} />
            </div>
          ))}
        </>
      )}

      {message && <ErrorMessage>{message}</ErrorMessage>}
    </div>
  );
};

export default Products;
