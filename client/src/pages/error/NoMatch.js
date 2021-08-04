import React from 'react';
import { Link } from 'react-router-dom';
import chevronRight from '../../assets/icon/chevron-right.svg';
import travoltaCrunched from '../../assets/gif/travolta-crunched.gif';

import './index.scss';

const NoMatch = () => {
  return (
    <div className="no-match">
      
      <h1>Looks like you got lost.</h1>
      
      <img className="gif" src={travoltaCrunched} alt="travolta lost gif" />
      <Link to="/shop" className="primary-btn">
        Go Back To Shop <img src={chevronRight} alt="go back" />
      </Link>
    </div>
  );
};

export default NoMatch;
