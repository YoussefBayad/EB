import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/forms/Button';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/ErrorMessage';
import { updateUser } from '../../redux/auth/authSlice';
import { Link } from 'react-router-dom';

//style

import './index.scss';
import { getOrders } from '../../redux/orders';
import { useEffect } from 'react';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const {
    data: orders,
    loading,
    message,
  } = useSelector((state) => state.orders);

  const isOrders = orders && orders.length;
  useEffect(() => {
    if (isOrders > 0) return;
    dispatch(getOrders(user._id));
  }, [dispatch, isOrders]);

  // formik setup
  const initialValues = {
    id: user._id,
    username: user.username,
    email: user.email,
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('This field is required'),
    email: Yup.string()
      .email('invalid email')
      .required('This field is required'),
    password: Yup.string().required('This field is required'),
  });

  const onSubmit = (values, onSubmitProps) => {
    dispatch(updateUser(values));
    onSubmitProps.resetForm();
  };

  return (
    <div className='user-profile'>
      <div className='update-user'>
        <h2>User Profile</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          <Form>
            <div>
              <h4>Username</h4>
              <Field name='username' placeholder='Enter username' />
              <ErrorMessage name='username' component={Message} />
            </div>

            <div>
              <h4>Email Address</h4>
              <Field type='text' name='email' placeholder='Enter email' />
              <ErrorMessage name='email' component={Message} />
            </div>

            <div>
              <h4>Password</h4>
              <Field type='text' name='password' placeholder='Enter password' />
              <ErrorMessage name='password' component={Message} />
            </div>

            <Button type='submit'>Update</Button>
          </Form>
        </Formik>
      </div>
      <div className='user-orders'>
        <h2>My Orders</h2>
        {loading && <p>loading ..</p>}
        {message && <Message>{message}</Message>}

        <table>
          <thead>
            <tr>
              <th className='user-id'>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td className='user-id'>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Link className='order-link' to={`/order/${order._id}`}>
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
