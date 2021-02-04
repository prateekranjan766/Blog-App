import React, { useState, useContext, useEffect, useRef } from 'react';
import BlogContext from './../../context/blog/blogContext';
import AuthContext from './../../context/auth/authContext';
import FormContainer from './../layout/FormContainer';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CreatePost = (props) => {
  const authContext = useContext(AuthContext);
  const blogContext = useContext(BlogContext);

  const textAreaRef = useRef('');
  const [textAreaHeight, setTextAreaHeight] = useState(100);

  const { addBlog, updateBlog, current, clearCurrent } = blogContext;

  const [blog, setBlog] = useState({
    title: '',
    description: '',
    data: '',
  });

  useEffect(() => {
    authContext.loadUser();
    if (current !== null) {
      setBlog(current);
    } else {
      setBlog({
        title: '',
        description: '',
        data: '',
      });
    }
    //eslint-disable-next-line
  }, [current]);

  const onChange = (e) => {
    setTextAreaHeight(textAreaRef.current.scrollHeight);
    if (e.target.name === 'title') {
      setBlog({ ...blog, [e.target.name]: e.target.value.substr(0, 210) });
    } else if (e.target.name === 'description') {
      setBlog({ ...blog, [e.target.name]: e.target.value.substr(0, 260) });
    } else {
      setBlog({ ...blog, [e.target.name]: e.target.value });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (current !== null) {
      updateBlog(blog);
    } else {
      addBlog(blog);
    }
    clearCurrent();
    props.history.push('/all-posts');
  };
  return (
    <>
      <Link
        className='btn btn-success'
        style={{
          fontSize: '1.8rem',
          padding: '.5rem 1rem',
          borderRadius: '3px',
        }}
        to='/my-posts'
      >
        Go Back
      </Link>
      <FormContainer>
        <h1 className='my-4 text-center' style={{ fontSize: '3rem' }}>
          {current !== null ? 'Update Blog' : 'Create a new Blog'}
        </h1>
        <Form onSubmit={onSubmit} className='py-3'>
          <Form.Group>
            <Form.Label style={{ fontSize: '1.6rem' }}>
              <i className='fas fa-pencil-alt'></i> Title
            </Form.Label>
            <Form.Control
              className='form_field'
              type='text'
              name='title'
              value={blog.title}
              placeholder='Title'
              onChange={onChange}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label style={{ fontSize: '1.6rem' }}>
              <i className='fas fa-newspaper'></i> Description
            </Form.Label>
            <Form.Control
              className='form_field'
              type='text'
              name='description'
              value={blog.description}
              placeholder='Description'
              onChange={onChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label style={{ fontSize: '1.6rem' }}>
              <i className='fas fa-newspaper'></i> Description
            </Form.Label>
            <Form.Control
              className='form_field'
              as='textarea'
              ref={textAreaRef}
              style={{ height: textAreaHeight }}
              type='text'
              name='data'
              value={blog.data}
              placeholder='Write your blog here...'
              onChange={onChange}
              required
            ></Form.Control>
          </Form.Group>
          <Button
            type='submit'
            className='btn-block my-3'
            style={{ fontSize: '1.8rem', padding: '1rem', borderRadius: '3px' }}
            variant='primary'
          >
            {current !== null ? 'Update' : 'Submit'}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CreatePost;
