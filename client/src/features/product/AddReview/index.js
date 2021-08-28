import React from 'react';
import Message from '../../../components/ErrorMessage';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../../../components/forms/Button';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addReview } from '../../../redux/productDetails/productDetailsSlice';
import Rating from '../../../components/Rating';

const AddReview = ({ id, reviews }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const username = user?.username;
  const userId = user?._id;

  //check if already reviewed
  const alreadyReviewed = reviews.find(
    (r) => r.user.toString() === userId?.toString()
  );

  // add review

  const initialValues = {
    comment: '',
    rating: 0,
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
    <div className='add-review'>
      <div>
        <h1>Reviews :</h1>
        {reviews.length === 0 && <Message>No Reviews</Message>}
        <div>
          {reviews.map((review) => (
            <div className='review' key={review._id}>
              <strong>{review.username}</strong>
              <Rating rating={review.rating} />
              <h6>{review.createdAt.substring(0, 10)}</h6>
              <p className='comment'>{review.comment}</p>
            </div>
          ))}
          <div>
            <h3>Write a Customer Review :</h3>

            {username ? (
              !alreadyReviewed ? (
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
                <p className='login-message'>
                  You Already reviewed this product
                </p>
              )
            ) : (
              <p className='login-message'>
                Please <Link to='/login'>sign in</Link> to write a review{' '}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
