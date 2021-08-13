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
import { Link } from 'react-router-dom';

const Registration = () => {
  const dispatch = useDispatch();
  const { loading, message } = useSelector((state) => state.auth);

  // formik setup
  const initialValues = {
    username: 'admin',
    email: 'admin@eb.com',
    password: '123456',
    confirmPassword: '123456',
    profilePicture: '../../assets/avatar.jfif',
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
          <ErrorMessage name='profilePicture' component={ErrorText} />
          <Button type='submit' className='btn' disabled={loading}>
            Register
          </Button>
          <h4>
            Already have an account ? <Link to='/login'>Login Now</Link>{' '}
          </h4>
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
