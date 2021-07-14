import React from 'react';
import Links from '../../components/Links';
import Products from '../../components/Products';
import { useSelector } from 'react-redux';

const Headphones = () => {
  const { data, status } = useSelector((state) => state.products);
  const headphones = data.filter((product) => product.category === 'Headphone');
  return (
    <div className="shop">
      <h1>Headphones</h1>
      <Links filter="Headphones" />
      <Products status={status} data={headphones} />
    </div>
  );
};

export default Headphones;
