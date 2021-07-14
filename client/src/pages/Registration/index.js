import React, { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Formik, Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import ErrorText from '../../components/ErrorMessage';
import Button from '../../components/forms/Button/index.js';
import Spinner from '../../components/Spinner/index.js';
import { auth, handleUserProfile } from '../../Firebase/utils.js';

// style
import './index.scss';




const Registration = () => {
  const history = useHistory();
  const currentUser = useSelector((state) => state.currentUser);

  const [status, setStatus] = useState('idle');
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser) {
      history.push('/');
    }
  }, [currentUser, history]);

// formik setup
const initialValues ={
  displayName:'user',
  email:'user@example.com',
  password:'qQ123456',
  confirmPassword:'qQ123456',
  photoURL:'https://miro.medium.com/max/3150/1*xxVEfOOAmIKHWOUloRKLhw.jpeg'
}

const validationSchema = Yup.object({
  displayName: Yup.string().required("This field is required"),
  email: Yup.string().email('invalid email').required('This field is required'),
  password: Yup.string().required('This field is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'),''], 'Password must match').required('This field is required'),
  photoURL: Yup.string().url('invalid URL').required('This field is required')
})

  const onSubmit = async (values,onSubmitProps) => {
    try {
      // register
      setStatus('loading');
      const { user } = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      const {displayName,photoURL} = values
      await handleUserProfile(user, { displayName, photoURL });
      onSubmitProps.resetForm()
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="contact-information">
      <h1>Register</h1>
      
      {!error && <Spinner status={status} />}
      

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
      >
      <Form >
      {error && <ErrorText>{error}</ErrorText>}
        <Field
          type="name"
          placeholder="Enter your name"
          name="displayName"
        />
        <ErrorMessage name='displayName' component={ErrorText}/>
        <Field
          type="email"
          placeholder="Enter your email"
          name="email"
        />
        <ErrorMessage name='email' component={ErrorText}/>
        <Field
          type="password"
          placeholder="Password"
          name="password"
        />
        <ErrorMessage name='password' component={ErrorText}/>
        <Field
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
        />
        <ErrorMessage name='confirmPassword' component={ErrorText}/>
        <Field
          type="url"
          placeholder="Photo URL"
          name='photoURL'
        />
        <ErrorMessage name='photoURL' component={ErrorText}/>
        <Button type='submit' className="btn">Register</Button>
      </Form>
      </Formik>
    </div>
  );
};

export default Registration;
