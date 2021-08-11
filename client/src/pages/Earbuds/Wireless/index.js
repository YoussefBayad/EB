import React from 'react';
import Links from '../../../components/Links';
import Products from '../../../features/product/Product';

// redux
import { useSelector } from 'react-redux';

const Wireless = () => {
  const { data, loading } = useSelector((state) => state.products);

  return (
    <div className='shop'>
      <h1>Wireless Earbuds</h1>
      <Links filter='Earbuds' />
      <Products
        loading={loading}
        data={data.filter(
          (product) =>
            product.category === 'Earbuds' && product.wireless === 'true'
        )}
      />
    </div>
  );
};

export default Wireless;
