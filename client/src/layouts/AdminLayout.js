import React from 'react';
import VerticalNav from '../components/VerticalNav';
import './AdminLayout.scss';
import AdminToolBar from '../components/AdminToolBar';
const AdminLayout = ({ children }) => {
  return (
    <div className="adminLayout">
      <AdminToolBar />
      <div className="control-panel">
        <div className="sidebar">
          <VerticalNav />
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
