import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import spinner from '../../assets/icon/spinner.gif';
import './index.scss';
const Spinner = ({ status, ...props }) => {
  return (
    <AnimatePresence>
      {status === 'loading' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="spinner"
          {...props}
        >
          <img src={spinner} alt="Loading ..." />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Spinner;
