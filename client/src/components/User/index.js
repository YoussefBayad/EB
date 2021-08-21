import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useOutsideClickRef from '@rooks/use-outside-click-ref';
import person from '../../assets/icon/person.svg';
import avatar from '../../assets/avatar.jpeg';
import Button from '../forms/Button/index.js';
import { AnimatePresence, motion } from 'framer-motion';
import { logout } from '../../redux/auth/authSlice';
// style
import './index.scss';

const User = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [ref] = useOutsideClickRef(() => setOpen(false));

  return (
    <div className='user' title={user ? user.username : 'Login'}>
      <img
        src={user ? avatar : person}
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
                  to='/register'
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
