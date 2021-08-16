import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';
const CheckoutSteps = () => {
  return (
    <div className='checkout-steps'>
      <NavLink
        to='/shipping'
        className='checkout-steps-link'
        activeClassName='active'>
        Shipping
      </NavLink>
      <NavLink
        to='/payment'
        className='checkout-steps-link'
        activeClassName='active'>
        Payment
      </NavLink>
      <NavLink
        to='/Order'
        className='checkout-steps-link'
        activeClassName='active'>
        Place Order
      </NavLink>
    </div>
  );
};

export default CheckoutSteps;
