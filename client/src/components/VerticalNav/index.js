import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Filter from '../Filter';
import './index.scss';
import Button from '../forms/Button';
import { auth } from '../../Firebase/utils';

const VerticalNav = ({ children }) => {
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <div className="vertical-nav">
      <div className="user-profile">
        <div className="user-img">
          <img src={currentUser.photoURL} alt="user" />
        </div>
        <span className="display-name">{currentUser.displayName}</span>
      </div>
      <div className="menu">
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/shop">
            <li>Shop</li>
          </Link>
          <li
            onClick={() => {
              auth.signOut();
            }}
          >
            <h2>Logout</h2>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VerticalNav;
