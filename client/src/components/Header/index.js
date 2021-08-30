import React from 'react';
import { NavLink } from 'react-router-dom';
import CartIcon from '../../features/cart/CartIcon';
import Search from '../Search';
import User from '../User';
import './index.scss';
import Burger from './Burger';
import SubHeader from './Subheader';

const Header = () => {
  return (
    <>
      <nav>
        <div className='nav-container'>
          <div className='left-nav'>
            <Burger />
            <NavLink to='/' className='logo'>
              EB
            </NavLink>
            <NavLink className='link' activeClassName='active' to='/shop'>
              Shop
            </NavLink>
            <NavLink className='link' activeClassName='active' to='/cart'>
              Cart
            </NavLink>
            <NavLink className=' link' activeClassName='active' to='/support'>
              Support
            </NavLink>
          </div>
          <div className='right-nav'>
            <Search />
            <User />
            <CartIcon />
          </div>
        </div>
      </nav>
      <SubHeader />
    </>
  );
};

export default Header;
