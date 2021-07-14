import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchInput from '../SearchInput/index.js';
import SearchResults from '../SearchResults/index.js';
import search from '../../assets/icon/search.svg';
import './index.scss';

const Search = ({ ...props }) => {
  const products = useSelector((state) => state.products.data);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleChange = (e) => {
    setShowSearchResults(true);
    if (e.target.value.trim() === '') {
      setSearchResults(products);
    } else {
      const results = products.search((product) =>
        product.name
          .replace(/\s/g, '')
          .toLowerCase()
          .includes(e.target.value.replace(/\s/g, '').toLowerCase())
      );
      setSearchResults(results);
    }
  };
  const handleClick = () => {
    setShowsearch(!showsearch);
  };

  return (
    <div className='search' {...props}>
      <div className='search-flex'>
        <searchInput
          handleChange={handleChange}
          handleClick={handleClick}
          showsearch={showsearch}
        />
        <SearchResults
          searchResults={searchResults}
          showSearchResults={showSearchResults}
          setShowSearchResults={setShowSearchResults}
        />
      </div>
      <img
        className='search-icon'
        src={search}
        alt='search icon'
        onClick={handleClick}
      />
    </div>
  );
};

export default Search;
