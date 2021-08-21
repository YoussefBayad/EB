import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/users';
const Users = () => {
  const dispatch = useDispatch();
  const { data: users, message, loading } = useSelector((state) => state.users);

  useEffect(() => {
    if (users?.length > 0) return;
    dispatch(getUsers());
  }, [dispatch, users?.length]);

  return (
    <div>
      <div className='users-list'>{users?.map((user) => user.username)}</div>
      {loading && <h1>Loading ...</h1>}
    </div>
  );
};

export default Users;
