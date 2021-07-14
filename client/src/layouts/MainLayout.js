import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SubHeader from '../components/Subheader';
import Cart from '../components/Cart';
import AdminToolBar from '../components/AdminToolBar';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Cart />
      <AdminToolBar />
      <Header />
      <SubHeader />
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
