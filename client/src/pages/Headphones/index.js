import React, { useEffect } from 'react';
import Links from '../../components/Links';
import Products from '../../features/product/Products';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/products/productsSlice';

const Headphones = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (data?.length > 0) return;
    dispatch(fetchProducts());
  }, [data.length, dispatch]);

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
