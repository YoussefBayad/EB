import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../features/cart/Cart';
import AdminToolBar from '../components/AdminToolBar';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Cart />
      <AdminToolBar />
      <Header />
      <div className='container'>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
