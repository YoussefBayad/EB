import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { logout } from '../../redux/auth/authSlice';

const VerticalNav = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className='vertical-nav'>
      <div className='user-profile'>
        <div className='user-img'>
          <img src={user.profilePicture} alt='user' />
        </div>
        <span className='display-name'>{user.username}</span>
      </div>
      <div className='menu'>
        <ul>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/shop'>
            <li>Shop</li>
          </Link>
          <li
            onClick={() => {
              dispatch(logout());
            }}>
            <h2>Logout</h2>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VerticalNav;
