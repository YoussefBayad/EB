import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';

function WithNoAuth({ children, location, ...rest }) {
  const user = useSelector((state) => state.auth.user);
  // const location = useLocation();
  const history = useHistory();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  console.log('location', redirect, location);
  return (
    <Route
      {...rest}
      render={() => (user ? history.push(redirect) : children)}
    />
  );
}

export default WithNoAuth;
