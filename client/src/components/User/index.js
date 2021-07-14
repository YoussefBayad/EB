import React, { useState } from 'react';

//link
import { Link } from 'react-router-dom';

//redux

import { useSelector } from 'react-redux';

// auth

import { auth } from '../../Firebase/utils.js';

// click outside

import useOutsideClickRef from '@rooks/use-outside-click-ref';
// img

import person from '../../assets/icon/person.svg';
// style
import './index.scss';
import Button from '../forms/Button/index.js';
import { AnimatePresence, motion } from 'framer-motion';

const User = () => {
  const [open, setOpen] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  const [ref] = useOutsideClickRef(() => setOpen(false));

  return (
    <div
      className="user"
      title={currentUser ? currentUser.displayName : 'Login'}
    >
      <img
        src={
          currentUser
            ? currentUser.photoURL
              ? currentUser.photoURL
              : person
            : person
        }
        alt="user"
        className="user-image"
        onClick={() => setOpen((prev) => !prev)}
      />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -50, scale:0.5 }}
            animate={{ y: 0 , scale:1 }}
            exit={{ y: 20, scale:0.5  }}
            transition={{ duration: 0.4 }}
            ref={ref}
            className="log"
          >
            {currentUser ? (
              <>
                <h3>{currentUser.displayName}</h3>
                <Button
                  onClick={() => {
                    auth.signOut();
                    setOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/registration"
                  className="btn"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="btn"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
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
