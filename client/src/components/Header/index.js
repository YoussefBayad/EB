import React from 'react';
import { Link } from 'react-router-dom';

import Filter from '../Filter';
import User from '../User';
import CartIcon from '../CartIcon';
import './index.scss';
import Burger from './Burger';

const Header = () => {
  return (
    <nav>
      <div className="nav-container">
        <div className="left-nav">
          <Burger />
          <Link to="/" className="logo">
            EB
          </Link>
          <Link className="shop-link" to="/shop">
            Shop
          </Link>
          <Link className="about-link" to="/">
            About
          </Link>
        </div>
        <div className="right-nav">
          <Filter />
          <User />
          <CartIcon />
        </div>
      </div>
    </nav>
  );
};

export default Header;
