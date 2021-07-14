import React from 'react';
import useOutsideClickRef from '@rooks/use-outside-click-ref';

import { motion, AnimatePresence } from 'framer-motion';

const SearchInput = ({ handleChange, handleClick, showSearch }) => {
  const [ref] = useOutsideClickRef(handleClick);

  return (
    <>
      <AnimatePresence>
        {showSearch && (
          <motion.input
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0 }}
            ref={ref}
            className='search-input'
            type='text'
            placeholder='Search ...'
            onChange={handleChange}
            autoFocus
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchInput;
