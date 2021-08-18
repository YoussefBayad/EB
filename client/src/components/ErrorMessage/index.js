import React from 'react';
import './index.scss';

const index = ({ children }) => {
  // if (typeof children !== String) return null;
  return <div className='error-message'>{children}</div>;
};

export default index;
