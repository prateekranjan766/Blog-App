import React, { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BlogContext from '../../../context/blog/blogContext';
import BlogItems from './BlogItems';
import { Form, Row, Col } from 'react-bootstrap';
import Loading from './../../loading/Loading';

const Blogs = (props) => {
  const blogContext = useContext(BlogContext);
  const {
    personalBlogs,
    getPersonalBlogs,
    loading,
    filterPersonalBlogs,
    filteredPersonal,
    clearFilter,
  } = blogContext;

  const text = useRef('');

  useEffect(() => {
    getPersonalBlogs();
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') filterPersonalBlogs(e.target.value);
    else clearFilter();
  };

  if (personalBlogs !== null && personalBlogs.length === 0 && !loading) {
    return (
      <>
        <Row className='my-4'>
          <Col md={3} style={{ paddingLeft: '10%' }}>
            <Link
              className='btn btn-success create-blog'
              style={{
                fontSize: '1.8rem',
                padding: '0.5rem',
                borderRadius: '3px',
              }}
              to='/create-new'
            >
              <i className='fas fa-plus'></i> Create Blog
            </Link>
          </Col>
          <Col md={9} className='mr-auto'>
            <Form style={{ marginBottom: '3rem', width: '80%' }}>
              <Form.Group>
                <Form.Label
                  style={{
                    position: 'absolute',
                    top: '1.2rem',
                    left: '2.3rem',
                  }}
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
          </Col>
        </Row>
      </>
    );
  }

  return (
    <>
      <Row className='my-4'>
        <Col md={3} style={{ paddingLeft: '10%' }}>
          <Link
            className='btn btn-success create-blog'
            style={{
              fontSize: '1.8rem',
              padding: '0.5rem',
              borderRadius: '3px',
            }}
            to='/create-new'
          >
            <i className='fas fa-plus'></i> Create Blog
          </Link>
        </Col>
        <Col md={9} className='mr-auto'>
          <Form style={{ marginBottom: '3rem', width: '80%' }}>
            <Form.Group>
              <Form.Label
                style={{
                  position: 'absolute',
                  top: '1.2rem',
                  left: '2.3rem',
                }}
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
        </Col>
      </Row>

      <div>
        {personalBlogs !== null && personalBlogs.length > 0 ? (
          <div className='blogs'>
            {filteredPersonal !== null
              ? filteredPersonal.map((blog) => (
                  <BlogItems
                    history={props.history}
                    key={blog.title}
                    blog={blog}
                  />
                ))
              : personalBlogs.map((blog) => (
                  <BlogItems
                    history={props.history}
                    key={blog.title}
                    blog={blog}
                  />
                ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Blogs;
