import React from 'react';
import { Link } from 'react-router-dom';
import useOutsideClickRef from '@rooks/use-outside-click-ref';
import { AnimatePresence, motion } from 'framer-motion';

const FilterResults = ({
  searchResults,
  setShowSearchResults,
  showSearchResults,
}) => {
  const handleClick = () => {
    setShowSearchResults(false);
  };
  const [ref] = useOutsideClickRef(handleClick);

  return (
    <AnimatePresence>
      {showSearchResults && (
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ duration: 0.4 }}
          ref={ref}
          className="search-results"
          onClick={handleClick}
        >
          {searchResults.map((product) => (
            <Link
              key={product.documentID}
              to={`/shop/product/${product.documentID}`}
            >
              <div className="search-product">
                <img
                  className="search-img"
                  src={
                    product.photoURL
                      ? product.photoURL
                      : ` /img/${product.name.replace(/\s/g, '')}.webp`
                  }
                  alt="product img"
                />
                <div className="text">
                  <p className="search-product-name">{product.name}</p>
                  <p>${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
          {searchResults.length === 0 && (
            <h1 style={{ marginTop: '3rem' }}>
              No item found search for another product
            </h1>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterResults;
