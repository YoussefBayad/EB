import React from 'react';
import Links from '../../../components/Links';
import Products from '../../../components/Products';

// redux
import { useSelector } from 'react-redux';

const Wireless = () => {
  const { data, status } = useSelector((state) => state.products);

  return (
    <div className="shop">
      <h1>Wireless Earbuds</h1>
      <Links filter="Earbuds" />
      <Products
        status={status}
        data={data.filter(
          (product) =>
            product.category === 'Earbuds' && product.wireless === 'true'
        )}
      />
    </div>
  );
};

export default Wireless;
