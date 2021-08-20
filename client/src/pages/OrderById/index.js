import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import Product from '../../features/product/Product';
import CheckoutSummary from '../../components/CheckoutSummary';
import CheckoutSteps from '../../components/CheckoutSteps';
import { getOrder, updateOrderToPaid } from '../../redux/order/orderSlice';
import Button from '../../components/forms/Button';
import { PayPalButton } from 'react-paypal-button-v2';

import { useParams } from 'react-router-dom';
import './index.scss';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';

const OrderById = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [sdkReady, setSdkReady] = useState(false);
  const { data: order, loading } = useSelector((state) => state.order);

  // fetch order
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order) {
      dispatch(getOrder(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, order, loading]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(updateOrderToPaid({ id, paymentResult }));
  };

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
                <p className='paid'>
                  Paid on: {order.paidAt.toLocaleString()}{' '}
                </p>
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
            {!order.isPaid && (
              <>
                {!sdkReady ? (
                  <Button className='btn checkout-btn'>Loading...</Button>
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </>
            )}
          </CheckoutSummary>
        </div>
      )}
    </div>
  );
};

export default OrderById;
