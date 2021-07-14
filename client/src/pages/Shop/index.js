import React from 'react';

import { useSelector } from 'react-redux';
import Links from '../../components/Links';
import Products from '../../components/Products';
import './index.scss';

const Shop = () => {
  const { data, status } = useSelector((state) => state.products);
  return (
    <div className="shop">
      <h1>Shop</h1>
      <Links filter="Shop" />
      <Products data={data} status={status} />
    </div>
  );
};

export default Shop;
