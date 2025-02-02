import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import AddToCart from '../../features/cart/AddToCart';
import { fetchProduct } from '../../redux/productDetails/productDetailsSlice';
import Skeleton from 'react-loading-skeleton';

import Rating from '../../components/Rating';

// svg
import wirelessCharging from '../../assets/icon/wirless-charging.webp';
import waterProof from '../../assets/icon/waterproof.webp';
import fullControl from '../../assets/icon/fullcontrol.webp';
import tile from '../../assets/icon/tile.webp';
import eitherBudSolo from '../../assets/icon/either-bud-solo.webp';
import hour40 from '../../assets/icon/40hour.webp';

// style
import './index.scss';

import AddReview from '../../features/product/AddReview';
import Meta from '../../components/Meta';

const ProductPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  const {
    data: product,
    loading,
    message,
  } = useSelector((state) => state.product);

  // incremet product qty
  const incrementQty = () => {
    if (qty === product.countInStock) return;
    setQty((prev) => prev + 1);
  };

  // check if product in cart
  const isProductInCart = useSelector((state) =>
    state.cart.data.find((item) => item._id === id)
  );

  // fetch product
  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id, dispatch]);

  return (
    <div
      initial={{ y: 1000, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className='product-showcase'>
      <Meta title={product?.name} />
      {message && history.push('/shop')}
      {loading && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <div>
            <Skeleton height={400} width={400} style={{ margin: 30 }} />
            <Skeleton height={400} width={400} style={{ marginTop: 30 }} />
          </div>
          <div>
            <Skeleton height={30} width={80} style={{ marginRight: 200 }} />
            <Skeleton height={30} width={80} />
          </div>
          <Skeleton height={300} width={600} style={{ marginTop: 30 }} />
        </div>
      )}
      {product && (
        <div className='product-container'>
          <div className='product-intro'>
            <div className='product-description'>
              <h1>{product.name} </h1>
              <h2>Price: ${product.price}</h2>
              <h3>In Stock: {product.countInStock} </h3>

              <Rating numReviews={product.numReviews} rating={product.rating} />
              <div>
                {!isProductInCart && (
                  <div className='product-qty'>
                    <button onClick={incrementQty}>+</button>
                    {qty}
                    <button
                      onClick={() => qty > 1 && setQty((prev) => prev - 1)}>
                      -
                    </button>
                  </div>
                )}
                <AddToCart product={{ ...product, qty }} />
              </div>
            </div>
            <img
              className='product-img'
              src={
                product.imageUrl
                  ? `http://localhost:5000${product.imageUrl}`
                  : `/img/${product.name.replace(/\s/g, '')}.webp`
              }
              alt={product.name}
            />
          </div>
          <div className='product-info'>
            <div className='product-info-container'>
              {product.details.wirelessCharging && (
                <div className='product-icon'>
                  <img src={wirelessCharging} alt='wireless charging icon' />
                  <h2>Wireless Charging Case</h2>
                </div>
              )}
              {product.details.totalCharge && (
                <div className='product-icon'>
                  <img src={hour40} alt='battery icon' />
                  <h2>
                    {product.details.totalCharge} Hours Total Battery + Rapid
                    Charge
                  </h2>
                </div>
              )}
              {product.details.waterProof && (
                <div className='product-icon'>
                  <img src={waterProof} alt='waterProof icon' />
                  <h2>Water and Dust Resistant</h2>
                </div>
              )}
              {product.details.fullControl && (
                <div className='product-icon'>
                  <img src={fullControl} alt=' control icon' />
                  <h2> Full Media Controls on Each Bud</h2>
                </div>
              )}
              {product.details.eitherBudSolo && (
                <div className='product-icon'>
                  <img src={eitherBudSolo} alt='bud icon' />
                  <h2>Use Either Bud Solo</h2>
                </div>
              )}
              {product.details.tile && (
                <div className='product-icon'>
                  <img src={tile} alt='wireless charging icon' />
                  <h2>Find your Earbuds with Tile™</h2>
                </div>
              )}
            </div>
          </div>
          <AddReview id={id} reviews={product.reviews} />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
