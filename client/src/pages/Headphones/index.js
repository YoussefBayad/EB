import React from 'react';
import Links from '../../components/Links';
import Products from '../../features/product/Products';
import { useSelector } from 'react-redux';

const Headphones = () => {
  const { data, loading } = useSelector((state) => state.products);
  const headphones = data.filter((product) => product.category === 'Headphone');
  console.log('headphones', headphones);
  return (
    <div className='shop'>
      <h1>Headphones</h1>
      <Links filter='Headphones' />
      <Products loading={loading} data={headphones} />
    </div>
  );
};

export default Headphones;
