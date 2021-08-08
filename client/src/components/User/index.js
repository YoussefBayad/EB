import React, { useState } from 'react';

//link
import { Link } from 'react-router-dom';

//redux

import { useDispatch, useSelector } from 'react-redux';

// auth

// click outside

import useOutsideClickRef from '@rooks/use-outside-click-ref';
// img

import person from '../../assets/icon/person.svg';
// style
import './index.scss';
import Button from '../forms/Button/index.js';
import { AnimatePresence, motion } from 'framer-motion';
import { logout } from '../../redux/auth/authSlice';

const User = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [ref] = useOutsideClickRef(() => setOpen(false));

  return (
    <div className='user' title={user ? user.username : 'Login'}>
      <img
        src={user ? user.photoURL : person}
        alt='user'
        className='user-image'
        onClick={() => setOpen((prev) => !prev)}
      />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -50, scale: 0.5 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: 0.5 }}
            transition={{ duration: 0.4 }}
            ref={ref}
            className='log'>
            {user ? (
              <>
                <h3>{user.username}</h3>
                <Button
                  onClick={() => {
                    dispatch(logout());
                    setOpen(false);
                  }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to='/registration'
                  className='btn'
                  onClick={() => {
                    setOpen(false);
                  }}>
                  Register
                </Link>
                <Link
                  to='/login'
                  className='btn'
                  onClick={() => {
                    setOpen(false);
                  }}>
                  login
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default User;
