import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../features/cart/Cart';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Cart />
      <Header />
      <div className='container'>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
