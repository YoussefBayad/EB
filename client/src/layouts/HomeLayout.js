import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SubHeader from '../components/Subheader';
import Cart from '../components/Cart';
import AdminToolBar from '../components/AdminToolBar';

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Cart />
      <AdminToolBar />
      <Header />
      <SubHeader />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
