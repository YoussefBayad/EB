import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';

import * as Yup from 'yup';
import ErrorText from '../../components/ErrorMessage';
import { saveShippingData } from '../../redux/cart/cartSlice';
import Button from '../../components/forms/Button';
import './index.scss';
import CheckoutSteps from '../../components/CheckoutSteps';

const Shipping = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const shippingData = useSelector((state) => state.cart.shippingData);

  // get initial values from storage
  let initialValues;
  shippingData
    ? (initialValues = shippingData)
    : (initialValues = {
        address: '',
        city: '',
        postalCode: '',
        country: '',
      });

  const validationSchema = Yup.object({
    address: Yup.string().required('address is required'),
    city: Yup.string().required('city is required'),
    postalCode: Yup.string().required('postal code is required'),
    country: Yup.string().required('country is required'),
    phoneNumber: Yup.string().required('phone number field is required'),
  });

  const onSubmit = (values) => {
    dispatch(saveShippingData(values));
    history.push('/payment');
  };

  return (
    <div className='shipping'>
      <CheckoutSteps />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        <Form>
          <Field type='address' name='address' placeholder='Address' />
          <ErrorMessage name='address' component={ErrorText} />

          <Field name='postalCode' type='text' placeholder='Postal code' />
          <ErrorMessage name='postalCode' component={ErrorText} />

          <Field name='city' type='text' placeholder='City' />
          <ErrorMessage name='city' component={ErrorText} />

          <Field name='country' type='text' placeholder='Country' />
          <ErrorMessage name='country' component={ErrorText} />

          <Field name='phoneNumber' type='text' placeholder='Phone number ' />
          <ErrorMessage name='phoneNumber' component={ErrorText} />

          <Button type='submit' className='btn'>
            Continue
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Shipping;
