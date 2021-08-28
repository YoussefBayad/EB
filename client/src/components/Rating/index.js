import React from 'react';
import './index.scss';
const Rating = ({ rating, numReviews }) => {
  const ratingNumber = Math.ceil(rating);
  return (
    <div className='rating'>
      {[...Array(ratingNumber).keys()].map((s) => (
        <span style={{ color: '#ff9933', cursor: 'pointer' }}>{'\u2605'}</span>
      ))}
      {[...Array(5 - ratingNumber).keys()].map((s) => (
        <span style={{ color: '#ff9933', cursor: 'pointer' }}>{'\u2606'}</span>
      ))}

      {numReviews && <p>{`${numReviews}`} reviews</p>}
    </div>
  );
};

export default Rating;
