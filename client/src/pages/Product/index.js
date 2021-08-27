import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { useSelector, useDispatch } from 'react-redux';
import AddToCart from '../../features/cart/AddToCart';
import { AnimatePresence, motion } from 'framer-motion';
import { fetchProduct } from '../../redux/productDetails/productDetailsSlice';
import Skeleton from 'react-loading-skeleton';
import Message from '../../components/ErrorMessage';
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
import Button from '../../components/forms/Button';
import { addReview } from '../../redux/products/productsSlice';

const ProductPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const { _id: currentUserId, username } = useSelector(
    (state) => state.auth.user
  );

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

  // add review
  const initialValues = {
    comment: '',
    rating: 0,
    user: currentUserId,
    username,
  };
  const addReviewHandler = (values) => {
    dispatch(
      addReview({
        review: values,
        productId: id,
      })
    );
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 1000, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className='product-showcase'>
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

                <Rating
                  numReviews={product.numReviews}
                  rating={product.rating}
                />
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
            <div className='add-review'>
              <div>
                <h1>Reviews</h1>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <div variant='flush'>
                  {product.reviews.map((review) => (
                    <div key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating rating={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                  <div>
                    <h3>Write a Customer Review</h3>

                    {currentUserId ? (
                      <Formik
                        initialValues={initialValues}
                        onSubmit={addReviewHandler}>
                        <Form>
                          <div>
                            <h4>Rating</h4>
                            <Field
                              name='rating'
                              as='select'
                              // value={rating}
                              // onChange={(e) => setRating(e.target.value)}
                            >
                              <option value=''>Select...</option>
                              <option value='1'>1 - Poor</option>
                              <option value='2'>2 - Fair</option>
                              <option value='3'>3 - Good</option>
                              <option value='4'>4 - Very Good</option>
                              <option value='5'>5 - Excellent</option>
                            </Field>
                          </div>
                          <div controlId='comment'>
                            <h4>Comment</h4>
                            <Field
                              as='textarea'
                              name='comment'
                              placeholder='write review'
                            />
                          </div>
                          <Button
                            // disabled={loadingProductReview}
                            type='submit'>
                            Add Review
                          </Button>
                        </Form>
                      </Formik>
                    ) : (
                      <Message>
                        Please <Link to='/login'>sign in</Link> to write a
                        review{' '}
                      </Message>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductPage;
