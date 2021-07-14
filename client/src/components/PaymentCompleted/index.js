import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import checked from '../../assets/icon/checked.svg';
import chevronRight from '../../assets/icon/chevron-right.svg';

const Completed = ({ name }) => {
  return (
    <div className="payment-completed">
      <h1>Thank you {name}.</h1>
      <h2>Your order was completed successfully.</h2>
      <img src={checked} alt="checked" />
      <Link to="/shop" className="btn go-back-btn">
        Go Back To Shop <img src={chevronRight} alt=">" />
      </Link>
    </div>
  );
};

export default Completed;
