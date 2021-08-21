import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/ErrorMessage';
import { deleteUser, getUsers } from '../../redux/users';
import edit from '../../assets/icon/edit.svg';
import './users.scss';

const Users = () => {
  const dispatch = useDispatch();
  const { data: users, message, loading } = useSelector((state) => state.users);

  useEffect(() => {
    if (users?.length > 0) return;
    dispatch(getUsers());
  }, [dispatch, users?.length]);

  const editUserHandler = () => {
    console.log('edit user');
  };

  return (
    <div>
      <h1>Users :</h1>
      {loading && <h1>Loading ...</h1>}
      {message && <ErrorMessage>{message} </ErrorMessage>}
      <div className='users-list'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user._id} </td>
                <td>{user.username} </td>
                <td>{user.email} </td>
                <td>{String(user.isAdmin)} </td>
                <td>
                  {' '}
                  <img
                    className='edit'
                    src={edit}
                    alt='edit'
                    onClick={editUserHandler}
                  />{' '}
                </td>
                <td onClick={() => dispatch(deleteUser(user._id))}>delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
