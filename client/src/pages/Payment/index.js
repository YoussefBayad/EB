import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ErrorText from '../../components/ErrorMessage';
import CheckoutSteps from '../../components/CheckoutSteps';

import { savePaymentMethod } from '../../redux/cart/cartSlice';
import Button from '../../components/forms/Button';
import './index.scss';
import { useHistory } from 'react-router-dom';

const Payment = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const shippingData = useSelector((state) => state.cart.shippingData);
  if (!shippingData) history.push('/shipping');

  const initialValues = {
    paymentMethod: 'PayPal',
  };
  const validationSchema = Yup.object({
    paymentMethod: Yup.string().required('please choose a payment method'),
  });
  const onSubmit = (values) => {
    dispatch(savePaymentMethod(values.paymentMethod));
    history.push('/order');
  };

  return (
    <div className='payment'>
      <CheckoutSteps />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        <Form>
          <h2>Select Payment Method:</h2>
          <Field as='select' name='paymentMethod'>
            <option value='PayPal'>PayPal</option>
            <option value='Stripe'>Stripe</option>
          </Field>
          <ErrorMessage name='paymentMethod' component={ErrorText} />

          <Button type='submit' className='btn'>
            Continue
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Payment;
