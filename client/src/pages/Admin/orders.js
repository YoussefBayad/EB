import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteOrder,
  getOrders,
  updateOrderToDelivered,
} from '../../redux/orders';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../components/forms/Button';
import './users.scss';

const Orders = () => {
  const dispatch = useDispatch();
  const {
    data: orders,
    message,
    loading,
  } = useSelector((state) => state.orders);
  const { _id: adminId } = useSelector((state) => state.auth.user);
  const isOrders = orders && orders.length;
  useEffect(() => {
    if (isOrders > 0) return;
    dispatch(getOrders());
  }, [dispatch, isOrders]);

  const editOrderHandler = () => {
    console.log('edit Order');
  };

  return (
    <div className='admin-users'>
      <h1>Users :</h1>
      {loading && <h1>Loading ...</h1>}
      {message && <ErrorMessage>{message} </ErrorMessage>}
      <div className='users-list'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td>{order._id} </td>
                <td>{order.user.username} </td>
                <td>{order.createdAt.substring(0, 10)} </td>
                <td>${order.totalPrice} </td>
                {order.isPaid ? (
                  <td>{order.paidAt.substring(0, 10)} </td>
                ) : (
                  <td>False</td>
                )}
                {order.isDelivered ? (
                  <td>{order.deliveredAt.substring(0, 10)} </td>
                ) : (
                  <td>
                    <Button
                      className='btn'
                      onClick={() =>
                        dispatch(updateOrderToDelivered(order._id))
                      }>
                      Mark as Delivered
                    </Button>
                  </td>
                )}

                <td
                  className='delete-user'
                  onClick={() => dispatch(deleteOrder(order._id))}>
                  delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
