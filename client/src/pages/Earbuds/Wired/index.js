import React from 'react';
import Links from '../../../components/Links';
import Products from '../../../components/Products';

// redux
import { useSelector } from 'react-redux';

const Wired = () => {
  const { data, status } = useSelector((state) => state.products);

  return (
    <div className="shop">
      <h1>Wired Earbuds</h1>
      <Links filter="Earbuds" />
      <Products
        status={status}
        data={data.filter((product) => product.wireless === 'false')}
      />
    </div>
  );
};

export default Wired;
