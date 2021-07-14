import React from 'react';

// react router
import { Link } from 'react-router-dom';

//redux
import { useDispatch } from 'react-redux';
// style
import './index.scss';
import { latest, lowest, highest } from '../../redux/Products/productsSlice';

const Links = ({ filter }) => {
  const dispatch = useDispatch();

  const handlePriceFilterChange = (e) => {
    const value = e.target.value;

    if (value === 'lowest') {
      dispatch(lowest());
    } else if (value === 'highest') {
      dispatch(highest());
    } else if (value === 'latest') {
      dispatch(latest());
    }
  };
  return (
    <div className="links">
      {filter === 'Shop' && (
        <>
          <Link to="/shop/headphones" className="link ">
            Headphones
          </Link>
          <Link to="/shop/earbuds" className="link ">
            Earbuds
          </Link>
          <Link to="/shop/batteries" className="link ">
            Battery
          </Link>
        </>
      )}
      {filter === 'Headphones' && (
        <>
          <Link to="/shop" className="link ">
            Shop
          </Link>
          <Link to="/shop/earbuds" className="link ">
            Earbuds
          </Link>
          <Link to="/shop/batteries" className="link ">
            Battery
          </Link>
        </>
      )}
      {filter === 'Earbuds' && (
        <>
          <Link to="/shop" className="link ">
            Shop
          </Link>
          <Link to="/shop/earbuds/wireless" className="link ">
            Wireless
          </Link>
          <Link to="/shop/earbuds/wired" className="link ">
            Wired
          </Link>
        </>
      )}
      {filter === 'Battery' && (
        <>
          <Link to="/shop" className="link ">
            Shop
          </Link>
          <Link to="/shop/headphones" className="link ">
            Headphones
          </Link>
          <Link to="/shop/earbuds" className="link ">
            Earbuds
          </Link>
        </>
      )}

      <div className="price-filter">
        <h3>Sort :</h3>
        <select onChange={handlePriceFilterChange}>
          <option value="latest">Latest</option>
          <option value="highest">Highest Price</option>
          <option value="lowest">Lowest Price</option>
        </select>
      </div>
    </div>
  );
};

export default Links;
