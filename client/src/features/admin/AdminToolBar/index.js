import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkUserIsAdmin } from '../../hooks/useAdminAuth';
import './index.scss';

const AdminToolBar = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const isAdmin = checkUserIsAdmin(currentUser);

  if (!isAdmin) return null;
  return (
    <div className="admin-tool-bar">
      <Link className="admin-link" to="/admin">
        Admin
      </Link>
    </div>
  );
};

export default AdminToolBar;
