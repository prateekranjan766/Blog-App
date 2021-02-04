import React, { useContext, useEffect, useRef } from 'react';
import BlogContext from '../../context/blog/blogContext';
import BlogItems from './BlogItems';
import { Form } from 'react-bootstrap';
import Loading from './../loading/Loading';
import FormContainer from './../layout/FormContainer';

const Blogs = () => {
  const blogContext = useContext(BlogContext);
  const {
    blogs,
    getBlogs,
    loading,
    filtered,
    filterBlogs,
    clearFilter,
  } = blogContext;

  const text = useRef('');

  useEffect(() => {
    getBlogs();
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') filterBlogs(e.target.value);
    else clearFilter();
  };

  if (blogs !== null && blogs.length === 0 && !loading) {
    return <Loading />;
  }

  return (
    <>
      <FormContainer>
        <Form style={{ margin: 'auto', marginBottom: '3rem' }} className='my-4'>
          <Form.Group>
            <Form.Label
              style={{ position: 'absolute', top: '2.5rem', left: '2.3rem' }}
            >
              <i
                className='fas fa-search'
                style={{ fontSize: '1.8rem', color: '#333' }}
              />
            </Form.Label>
            <Form.Control
              className='form_field'
              style={{ paddingLeft: '3rem' }}
              type='text'
              ref={text}
              name={text}
              placeholder='Search for Blog title'
              onChange={onChange}
            ></Form.Control>
          </Form.Group>
        </Form>
      </FormContainer>
      <div>
        {blogs !== null && !loading ? (
          <div className='my-5'>
            {filtered !== null
              ? filtered.map((blog) => (
                  <BlogItems key={blog.title} blog={blog} />
                ))
              : blogs.map((blog) => <BlogItems key={blog.title} blog={blog} />)}
          </div>
        ) : (
          <h1>
            <Loading />
          </h1>
        )}
      </div>
    </>
  );
};

export default Blogs;
