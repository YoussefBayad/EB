import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../features/cart';

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Cart />
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
