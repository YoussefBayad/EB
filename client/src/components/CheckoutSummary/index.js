import React from 'react';

import './index.scss';

const CheckoutSummary = ({ children, total, totalItems }) => {
  return (
    <div className='checkout-summary'>
      <h1 className='checkout-summary-title'>ORDER SUMMARY </h1>
      <div className='total-items'>
        <p className='text'>Total items </p>
        <p className='price'>{totalItems}</p>
      </div>
      <div className='shipping-cost'>
        <p className='text'>Shipping </p>
        <p className='price'>$00.00</p>
      </div>
      <div className='total-price'>
        <p className='text'>Total </p>
        <p className='price'>${total}</p>
      </div>
      {children}
    </div>
  );
};

export default CheckoutSummary;
