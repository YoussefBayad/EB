import React from 'react';
import './index.scss';

// svg

import chevronRight from '../../assets/icon/chevron-right.svg';
import facebook from '../../assets/icon/facebook.svg';
import twitter from '../../assets/icon/twitter.svg';
import linkedin from '../../assets/icon/linkedin.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className='hear-it-first'>
        <h2>Hear It First</h2>
        <div className='input mt-2 ml-4'>
          <input type='email' placeholder='Sign Up For Email ...' required />
          <img src={chevronRight} alt='click' />
        </div>
      </div>
      <div className='footer-links'>
        <div>
          <Link to='/'>Help Center</Link>
          <Link to='/'>Contact Us</Link>
          <Link to='/'>Account</Link>
          <Link to='/'>Product Help</Link>
        </div>
        <div>
          <Link to='/'>Compare</Link>
          <Link to='/'>Bulk Orders</Link>
          <Link to='/'>Protect Our Winters</Link>
        </div>
        <div>
          <Link to='/'>Athletes</Link>
          <Link to='/'>Warranty</Link>
          <Link to='/'>Careers</Link>
        </div>
      </div>
      <div className='social-media'>
        <h2>FOLLOW US</h2>
        <div className='social-media-icons'>
          <a href='https://twitter.com/bayad_jo'>
            <img src={twitter} alt='my twitter account' />
          </a>
          <a href='https://www.facebook.com/profile.php?id=100030355061041'>
            <img src={facebook} alt='my facebook account' />
          </a>

          <a href='https://www.linkedin.com/in/youssef-bayad-5584171b4/'>
            <img src={linkedin} alt='my linkedin account' />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
