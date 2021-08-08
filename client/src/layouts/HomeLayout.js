import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../features/cart/Cart';
import AdminToolBar from '../components/AdminToolBar';

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Cart />
      <AdminToolBar />
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
