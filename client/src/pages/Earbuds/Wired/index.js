import React from 'react';
import Links from '../../../components/Links';
import Products from '../../../features/product/Product';

// redux
import { useSelector } from 'react-redux';

const Wired = () => {
  const { data, loading } = useSelector((state) => state.products);

  return (
    <div className='shop'>
      <h1>Wired Earbuds</h1>
      <Links filter='Earbuds' />
      <Products
        loading={loading}
        data={data.filter((product) => product.wireless === 'false')}
      />
    </div>
  );
};

export default Wired;
