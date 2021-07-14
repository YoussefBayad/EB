import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Formik, Form,Field,ErrorMessage} from 'formik';
import  * as Yup from 'yup';
import { auth, signInWithGoogle } from '../../Firebase/utils';
import Button from '../../components/forms/Button';
import Spinner from '../../components/Spinner';
import ErrorText from './../../components/ErrorMessage';
//style
import './index.scss';


const Login = () => {
  
  const history = useHistory();
  const currentUser = useSelector((state) => state.currentUser);

  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      history.push('/');
    }
  }, [currentUser, history]);

  
// formik setup

const initialValues = {
  email:'',
  password:''
}

const validationSchema = Yup.object( {
  email:Yup.string().email("Invalid Email").required('This field is required'),
  password:Yup.string().required('This field is required')
})
  const onSubmit = async (values, onSubmitProps) => {
    try {
      setStatus('loading');
      await auth.signInWithEmailAndPassword(values.email, values.password);
      onSubmitProps.resetForm()

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <div className="sign-in">
        <h1>SIGN iN</h1>
        {!error && <Spinner status={status} />}
        <Button
          onClick={() => {
            setStatus('loading');

            auth.signInWithEmailAndPassword('Admin@eb.com', 'qQ123456');
          }}
          className="btn btn-login-as-admin"
        >
          Login as Admin
        </Button>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange={false}
            
            onSubmit={onSubmit}
            >
          <Form>
            {error && <ErrorText>{error}</ErrorText>}
            <Field
              type="email"
              placeholder="Enter your email"
              name="email"
            />
            <ErrorMessage component={ErrorText} name='email' />
            <Field
              type="password"
              placeholder="Password"
              name="password"
            />
            <ErrorMessage component={ErrorText} name='password'/>

            <Button type='submit' className="btn">Sign In</Button>
        </Form>
      </Formik>
        
        <Button
          className="btn"
          onClick={() => {
            setStatus('loading');
            signInWithGoogle();
          }}
        >
          Sign In With Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
