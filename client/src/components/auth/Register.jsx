import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './../../context/auth/authContext';
import AlertContext from './../../context/alert/alertContext';
import { Form, Button } from 'react-bootstrap';
import FormContainer from './../layout/FormContainer';

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { isAuthenticated, register, error, clearError } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/all-posts');
    }
    if (error === 'User already exists!') {
      setAlert({ msg: error, type: 'danger' });
      clearError();
    }
    //eslint-disable-next-line
  }, [isAuthenticated, error, props.history]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '' || password1 === '') {
      setAlert('Please fill all fields');
    } else if (password !== password1) {
      setAlert({ msg: 'Passwords does not match', type: 'danger' });
    } else {
      register({
        name,
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
          Account <span style={{ color: '#ef4f4ff3' }}>Register</span>
        </h1>
        <Form onSubmit={onSubmit} className='my-3'>
          <Form.Group controlId='name'>
            <Form.Label style={{ fontSize: '1.6rem' }}>
              <i className='fas fa-user'></i> Name
            </Form.Label>
            <Form.Control
              className='form_field'
              type='text'
              value={name}
              placeholder='Name'
              onChange={(e) => setName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label style={{ fontSize: '1.6rem' }}>
              <i className='fas fa-envelope-open'></i> Email Address
            </Form.Label>
            <Form.Control
              className='form_field'
              type='email'
              value={email}
              placeholder='Email Address'
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label style={{ fontSize: '1.6rem' }}>
              <i className='fas fa-lock'></i> Password
            </Form.Label>
            <Form.Control
              className='form_field'
              type='password'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password1'>
            <Form.Label style={{ fontSize: '1.6rem' }}>
              <i className='fas fa-lock'></i> Confirm password
            </Form.Label>
            <Form.Control
              className='form_field'
              type='password'
              value={password1}
              placeholder='Confirm Password'
              onChange={(e) => setPassword1(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Button
            type='submit'
            className='btn btn-block'
            style={{
              backgroundColor: '#ef4f4ff3',
              borderRadius: '3px',
              padding: '.7rem 1rem',
              fontSize: '1.6rem',
            }}
          >
            Register
          </Button>
        </Form>
        <span style={{ fontSize: '1.6rem' }}>
          Already an user? <Link to='/login'>Login</Link>
        </span>
      </FormContainer>
    </>
  );
};

export default Register;
