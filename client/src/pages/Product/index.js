import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Count from '../../features/product/ProductCount';
import AddToCart from '../../features/cart/AddToCart';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import { AnimatePresence, motion } from 'framer-motion';
import { fetchProduct } from '../../redux/productDetails/productDetailsSlice';
import Skeleton from 'react-loading-skeleton';
// svg
import wirelessCharging from '../../assets/icon/wirless-charging.webp';
import waterProof from '../../assets/icon/waterproof.webp';
import fullControl from '../../assets/icon/fullcontrol.webp';
import tile from '../../assets/icon/tile.webp';
import eitherBudSolo from '../../assets/icon/either-bud-solo.webp';
import hour40 from '../../assets/icon/40hour.webp';

// style
import './index.scss';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id]);

  const {
    data: product,
    loading,
    message,
  } = useSelector((state) => state.product);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 1000, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className='product-showcase'>
        <ErrorMessage>{message} </ErrorMessage>
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
          <>
            <div className='product-intro'>
              <div className='product-description'>
                <h1>{product.name} </h1>
                <h2>${product.price} usd </h2>
                <div>
                  <Count id={product._id} count={product.count} />
                  <AddToCart product={product} />
                </div>
              </div>
              <img
                className='product-img'
                src={
                  product.imageURL
                    ? product.imageURL
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
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductPage;
