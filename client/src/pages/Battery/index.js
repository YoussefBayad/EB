import React from 'react';
import './index.scss';
import Links from '../../components/Links';
import Products from '../../components/Products';

// redux
import { useSelector } from 'react-redux';

const Battery = () => {
  const { data, status } = useSelector((state) => state.products);

  return (
    <div className="shop">
      <h1>Batteries</h1>
      <Links filter="Battery" />
      <Products
        data={data.filter((product) => product.category === 'Battery')}
        status={status}
      />
    </div>
  );
};

export default Battery;
