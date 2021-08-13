import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';

function WithAuth({ children, ...rest }) {
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={() => (user ? children : history.push('/login?redirect=payment'))}
    />
  );
}

export default WithAuth;
