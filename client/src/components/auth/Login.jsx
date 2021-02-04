import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './../../context/auth/authContext';
import AlertContext from './../../context/alert/alertContext';
import FormContainer from './../layout/FormContainer';
import { Form, FormControl, Button } from 'react-bootstrap';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { isAuthenticated, error, clearError, login } = authContext;
  const { setAlert } = alertContext;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/all-posts');
    }
    if (error === 'Invalid Credentials!') {
      setAlert({ msg: 'Invalid Credentials!', type: 'danger' });
      clearError();
    }
    //eslint-disable-next-line
  }, [isAuthenticated, props.history, error]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert({ msg: 'Please enter all fields', type: 'danger' });
    } else {
      login({
        email,
        password,
      });
    }
  };
  return (
    <>
      <FormContainer>
        <h1
          className='my-4 text-center'
          style={{ color: 'khaki', fontSize: '4.5rem' }}
        >
          Account <span style={{ color: '#ef4f4ff3' }}>Login</span>
        </h1>
        <Form onSubmit={onSubmit} className='my-3'>
          <Form.Group controlId='email'>
            <Form.Label style={{ fontSize: '1.6rem' }}>
              <i className='fas fa-envelope-open'></i> Email Address
            </Form.Label>
            <FormControl
              type='email'
              className='form_field'
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              required
            ></FormControl>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label style={{ fontSize: '1.6rem' }}>
              <i className='fas fa-lock'></i> Password
            </Form.Label>
            <FormControl
              type='password'
              className='form_field'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            ></FormControl>
          </Form.Group>
          <Button
            type='submit'
            className='btn btn-block'
            style={{
              backgroundColor: '#ef4f4ff3',
              borderRadius: '3px',
              fontSize: '1.6rem',
              padding: '.7rem 1rem',
            }}
          >
            Log In
          </Button>
        </Form>
        <span style={{ fontSize: '1.6rem' }}>
          New Here? <Link to='/register'>Register</Link>
        </span>
      </FormContainer>
    </>
  );
};

export default Login;
