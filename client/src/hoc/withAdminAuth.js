import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const WithAdminAuth = ({ children, ...rest }) => {
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();
  const isAdmin = user?.isAdmin;

  return (
    <Route {...rest} render={() => (isAdmin ? children : history.push('/'))} />
  );
};

export default WithAdminAuth;
