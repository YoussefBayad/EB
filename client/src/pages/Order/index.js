import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import Product from '../../features/product/Product';
import CheckoutSummary from '../../components/CheckoutSummary';
import CheckoutSteps from '../../components/CheckoutSteps';
import './index.scss';
import { addOrder } from '../../redux/order/orderSlice';
import Button from '../../components/forms/Button';
import { useHistory } from 'react-router-dom';
import { resetCart } from '../../redux/cart/cartSlice';

const Order = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let products = useSelector((state) => state.cart.data);

  const paymentMethod = useSelector((state) => state.cart.paymentMethod);
  const shippingData = useSelector((state) => state.cart.shippingData);
  const order = useSelector((state) => state.order.data);
  if (order) history.push(`/order/${order._id}`);
  // add order
  const addOrderHandler = () => {
    dispatch(
      addOrder({
        orderItems: products,
        shippingAddress: shippingData,
        paymentMethod,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: Number(total),
      })
    );
    dispatch(resetCart());
  };
  // total price
  const total =
    products.length > 0 &&
    products
      .reduce((a, p) => {
        return a + p.price * p.qty;
      }, 0)
      .toFixed(2);
  // total items
  const totalItems = products.length;

  const isData = products.length > 0;
  return (
    <div className='order-page'>
      <CheckoutSteps />
      <div className='order-page-inner'>
        <div className='left'>
          <div className='shipping'>
            <h3>Shipping :</h3>
            {`${shippingData.address} ${shippingData.city} ${shippingData.postalCode} ${shippingData.country}`}
          </div>
          <div className='payment-method'>
            <h3>Payment Method :</h3>
            {`${paymentMethod}`}
          </div>
          {isData && (
            <div className='order-page-products'>
              <h3>Order Units :</h3>
              <AnimatePresence>
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
        {isData && (
          <CheckoutSummary total={total} totalItems={totalItems}>
            <Button className='btn checkout-btn' onClick={addOrderHandler}>
              Place Order
            </Button>
          </CheckoutSummary>
        )}
      </div>
    </div>
  );
};

export default Order;
