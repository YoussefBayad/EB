import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/forms/Button';
import ErrorText from './../../components/ErrorMessage';
import { login } from '../../redux/auth/authSlice';
//style
import './index.scss';
import { Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const { loading, message } = useSelector((state) => state.auth);

  // formik setup

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid Email')
      .required('This field is required'),
    password: Yup.string().required('This field is required'),
  });
  const onSubmit = (values, onSubmitProps) => {
    dispatch(login(values));
  };

  return (
    <div className='login-container'>
      <div className='login'>
        <h1>LOGiN</h1>
        <Button
          onClick={() => {
            dispatch(login({ email: 'admin@eb.com', password: '123456' }));
          }}
          className='btn btn-login-as-admin'>
          Login as Admin
        </Button>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          onSubmit={onSubmit}>
          <Form>
            {message && <ErrorText>{message}</ErrorText>}
            <Field type='email' placeholder='Enter your email' name='email' />
            <ErrorMessage component={ErrorText} name='email' />
            <Field type='password' placeholder='Password' name='password' />
            <ErrorMessage component={ErrorText} name='password' />

            <Button type='submit' className='btn' disabled={loading}>
              Login
            </Button>
          </Form>
        </Formik>

        <Button
          className='btn'
          onClick={() => {
            // signInWithGoogle();
          }}>
          Login With Google
        </Button>

        <h4>
          Don't have an account ? <Link to='/register'>Register</Link>{' '}
        </h4>
      </div>
    </div>
  );
};

export default Login;
