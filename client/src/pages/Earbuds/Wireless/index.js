import React, { useEffect, useState } from 'react';
import Links from '../../../components/Links';
import Products from '../../../features/product/Products';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/products/productsSlice';

const Wireless = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.products);
  const wireless = data.filter(
    (product) =>
      product.category === 'Earbuds' && product.details.wireless === 'true'
  );

  useEffect(() => {
    if (data?.length > 0) return;
    dispatch(fetchProducts());
  }, []);

  return (
    <div className='shop'>
      <h1>Wireless Earbuds</h1>
      <Links filter='Earbuds' />
      <Products loading={loading} data={wireless} />
    </div>
  );
};

export default Wireless;
