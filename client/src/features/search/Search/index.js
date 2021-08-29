import React, { useState } from 'react';
import searchIcon from '../../../assets/icon/search.svg';
import './index.scss';
import Button from '../../../components/forms/Button';
import { useHistory } from 'react-router-dom';

const Search = () => {
  const [keyword, setKeyword] = useState(null);
  const history = useHistory();

  // handle search submits
  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/shop');
    }
  };

  return (
    <div className='search'>
      <form onSubmit={handleSearch}>
        <input
          className='search-input'
          type='text'
          placeholder='Search ...'
          onChange={(e) => setKeyword(e.target.value)}
          autoFocus
        />
        <Button>
          <img className='search-icon' src={searchIcon} alt='search icon' />
        </Button>
      </form>
    </div>
  );
};

export default Search;
