import React, { useEffect, useState } from 'react';
import search from '../../assets/icon/search.svg';
import './index.scss';

const AdminFilter = ({ products, setProducts, initialState }) => {
  const [query, setQuery] = useState('')
  const handleChange = (e) => {
    setQuery(e.target.value)
  }
  useEffect(() => {
  
    if (query.trim() === '') {
      setProducts(initialState);
    } else {
      const results = initialState.filter((product) =>
        product.name
          .replace(/\s/g, '')
          .toLowerCase()
          .includes(query.replace(/\s/g, '').toLowerCase())
      );
      setProducts(results);
    }
  },[query,setProducts, initialState])

  return (
    <div className="admin-filter">
        
          <input
            type="text"
            placeholder="Search ..."
            onChange={handleChange}
            autoFocus
          />
      
      <img className="search-icon" src={search} alt="search icon" />
    </div>
  );
};

export default AdminFilter;
