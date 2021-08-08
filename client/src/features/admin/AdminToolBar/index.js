import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.scss';

const AdminToolBar = () => {
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.isAdmin;

  if (!isAdmin) return null;
  return (
    <div className='admin-tool-bar'>
      <Link className='admin-link' to='/admin'>
        Admin
      </Link>
    </div>
  );
};

export default AdminToolBar;
