import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ErrorText from '../../components/ErrorMessage';
import Button from '../../components/forms/Button/index.js';
import Spinner from '../../components/Spinner/index.js';
import { register } from '../../redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
// style
import './index.scss';

const Registration = () => {
  const dispatch = useDispatch();
  const { loading, message } = useSelector((state) => state.auth);

  // formik setup
  const initialValues = {
    username: 'user',
    email: 'user@example.com',
    password: '123456',
    confirmPassword: '123456',
    profilePicture:
      'https://miro.medium.com/max/3150/1*xxVEfOOAmIKHWOUloRKLhw.jpeg',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('This field is required'),
    email: Yup.string()
      .email('invalid email')
      .required('This field is required'),
    password: Yup.string().required('This field is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Password must match')
      .required('This field is required'),
    profilePicture: Yup.string()
      .url('invalid URL')
      .required('This field is required'),
  });

  const onSubmit = async (values, onSubmitProps) => {
    // register
    dispatch(register(values));
    onSubmitProps.resetForm();
  };
  return (
    <div className='contact-information'>
      <h1>Register</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}>
        <Form>
          {message && <ErrorText>{message}</ErrorText>}
          <Field type='name' placeholder='Enter your name' name='username' />
          <ErrorMessage name='username' component={ErrorText} />
          <Field type='email' placeholder='Enter your email' name='email' />
          <ErrorMessage name='email' component={ErrorText} />
          <Field type='password' placeholder='Password' name='password' />
          <ErrorMessage name='password' component={ErrorText} />
          <Field
            type='password'
            placeholder='Confirm password'
            name='confirmPassword'
          />
          <ErrorMessage name='confirmPassword' component={ErrorText} />
          <Field type='url' placeholder='Photo URL' name='profilePicture' />
          <ErrorMessage name='profilePicture' component={ErrorText} />
          <Button type='submit' className='btn' disabled={loading}>
            Register
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
