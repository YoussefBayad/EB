import React from 'react';
import './index.scss';
import Links from '../../components/Links';
import Products from '../../features/product/Products';

// redux
import { useSelector } from 'react-redux';

const Battery = () => {
  const { data, loading } = useSelector((state) => state.products);

  return (
    <div className='shop'>
      <h1>Batteries</h1>
      <Links filter='Battery' />
      <Products
        data={data.filter((product) => product.category === 'Battery')}
        loading={loading}
      />
    </div>
  );
};

export default Battery;
