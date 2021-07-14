import useOutsideClickRef from '@rooks/use-outside-click-ref';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../../Firebase/utils';
import Button from '../forms/Button';
import deleteIcon from '../../assets/icon/delete.svg';

const ResponsiveNav = ({ open, setOpen }) => {
  const currentUser = useSelector((state) => state.currentUser);
  const [ref] = useOutsideClickRef(() => setOpen(false));

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="overlay"
          />
          <motion.div
            initial={{ x: -1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -1000, opacity: 0 }}
            transition={{ duration: 0.5 }}
            ref={ref}
            className="responsive-nav"
          >
            <img
              src={deleteIcon}
              alt="close cart"
              className="close-nav"
              onClick={() => setOpen(false)}
            />

            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/shop" onClick={() => setOpen(false)}>
              Shop
            </Link>
            <Link to="/shop/headphones" onClick={() => setOpen(false)}>
              Headphones
            </Link>
            <Link to="/shop/earbuds" onClick={() => setOpen(false)}>
              Earbuds
            </Link>
            <Link to="/" onClick={() => setOpen(false)}>
              About Us
            </Link>
            {currentUser ? (
              <Button
                style={{ color: 'white' }}
                onClick={() => {
                  auth.signOut();
                  setOpen(false);
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link
                  className="btn"
                  style={{ color: 'white', textAlign: 'center' }}
                  to="/login"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  className="btn"
                  style={{ color: 'white', textAlign: 'center' }}
                  to="/register"
                  onClick={() => setOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveNav;
