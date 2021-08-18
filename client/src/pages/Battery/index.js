import React, { useEffect } from 'react';
import './index.scss';
import Links from '../../components/Links';
import Products from '../../features/product/Products';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/products/productsSlice';

const Battery = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.length > 0) return;
    dispatch(fetchProducts());
  }, []);
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
