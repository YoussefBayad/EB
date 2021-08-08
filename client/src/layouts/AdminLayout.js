import React from 'react';
import AdminNav from '../features/admin/AdminNav';
import './AdminLayout.scss';
import AdminToolBar from '../components/AdminToolBar';
const AdminLayout = ({ children }) => {
  return (
    <div className='adminLayout'>
      <AdminToolBar />
      <div className='control-panel'>
        <div className='sidebar'>
          <AdminNav />
        </div>
        <div className='content'>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
