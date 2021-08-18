import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import Product from '../../features/product/Product';
import CheckoutSummary from '../../components/CheckoutSummary';
import ErrorMessage from '../../components/ErrorMessage';
import CheckoutSteps from '../../components/CheckoutSteps';
import { getOrder } from '../../redux/order/orderSlice';
import Button from '../../components/forms/Button';
import { useParams } from 'react-router-dom';
import './index.scss';
import Skeleton from 'react-loading-skeleton';

const OrderById = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data: order, loading, message } = useSelector((state) => state.order);

  // fetch order
  useEffect(() => {
    dispatch(getOrder(id));
  }, [id, dispatch]);

  return (
    <div className='order-page'>
      <CheckoutSteps />
      {loading ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <div>
            <Skeleton height={400} width={400} style={{ margin: 30 }} />
            <Skeleton height={400} width={400} style={{ marginTop: 30 }} />
          </div>
          <div>
            <Skeleton height={30} width={80} style={{ marginRight: 200 }} />
            <Skeleton height={30} width={80} />
          </div>
          <Skeleton height={300} width={600} style={{ marginTop: 30 }} />
        </div>
      ) : (
        <div className='order-page-inner'>
          <div className='left'>
            <div className='shipping'>
              <h3>Shipping :</h3>

              {`${order.shippingAddress.address} ${order.shippingAddress.city} ${order.shippingAddress.postalCode} ${order.shippingAddress.country}`}
              {order.isDelivered ? (
                <p className='paid'>Delivered on: {order.deliveredAt} </p>
              ) : (
                <p className='not-paid'>Not Delivered </p>
              )}
            </div>
            <div className='payment-method'>
              <h3>Payment Method :</h3>
              {`${order.paymentMethod}`}
              {order.isPaid ? (
                <p className='paid'>Paid on: {order.paidAt} </p>
              ) : (
                <p className='not-paid'>Not Paid </p>
              )}
            </div>

            <div className='order-page-products'>
              <h3>Order Units :</h3>
              <AnimatePresence>
                {order.orderItems.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </AnimatePresence>
            </div>
          </div>

          <CheckoutSummary
            total={order.totalPrice}
            totalItems={order.orderItems.length}>
            <Button className='btn checkout-btn'>Place Order</Button>
          </CheckoutSummary>
        </div>
      )}
    </div>
  );
};

export default OrderById;
