import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Links from '../../components/Links';
import Products from '../../features/product/Products';
import { fetchProducts } from '../../redux/products/productsSlice';
import './index.scss';

const Shop = () => {
  const { data, loading, message } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.length > 0) return;
    dispatch(fetchProducts());
  }, []);
  return (
    <div className='shop'>
      <h1>Shop</h1>
      <Links filter='Shop' />
      <Products data={data} loading={loading} message={message} />
    </div>
  );
};

export default Shop;
