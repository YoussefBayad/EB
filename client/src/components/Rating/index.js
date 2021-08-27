import React from 'react';
import './index.scss';
const Rating = ({ rating, numReviews }) => {
  return (
    <div className='rating'>
      {[...Array(rating).keys()].map((s) => (
        <span style={{ color: '#ff9933', cursor: 'pointer' }}>{'\u2605'}</span>
      ))}
      {[...Array(5 - rating).keys()].map((s) => (
        <span style={{ color: '#ff9933', cursor: 'pointer' }}>{'\u2606'}</span>
      ))}

      <p>{`${numReviews}`} reviews</p>
    </div>
  );
};

export default Rating;
