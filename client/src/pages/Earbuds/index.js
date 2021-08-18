import React, { useEffect } from 'react';
import Links from '../../components/Links';
import Products from '../../features/product/Products';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/products/productsSlice';

const Earbuds = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (data?.length > 0) return;
    dispatch(fetchProducts());
  }, [data.length, dispatch]);
  const earbuds = data.filter((product) => product.category === 'Earbuds');

  console.log('Earbuds', data);

  return (
    <div className='shop'>
      <h1>Earbuds</h1>
      <Links filter='Earbuds' />
      <Products loading={loading} data={earbuds} />
    </div>
  );
};

export default Earbuds;
