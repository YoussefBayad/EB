import React from 'react';

const index = ({ children }) => {
  if (typeof children !== String) return null;
  return <div className='error'>{children}</div>;
};

export default index;
