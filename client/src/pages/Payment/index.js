import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ErrorText from '../../components/ErrorMessage';
import { paymentCompleted } from '../../redux/cart/cartSlice';
import Button from '../../components/forms/Button';
import './index.scss';
import { useHistory } from 'react-router-dom';

const Payment = () => {
  const dispatch = useDispatch();
  const shippingData = useSelector((state) => state.cart.shippingData);
  const history = useHistory();
  if (!shippingData) history.push('/shipping');
  const initialValues = {
    name: '',
  };
  const validationSchema = Yup.object({
    name: Yup.string().required('This field is required'),
  });
  const onSubmit = (values) => {};

  return (
    <div className='payment'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        <Form>
          <Field type='text' placeholder='Name on Card' name='name' />
          <ErrorMessage name='name' component={ErrorText} />

          <Button type='submit' className='btn'>
            Complete Payment
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Payment;
