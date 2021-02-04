import React, { useState, useContext } from 'react';
import BlogContext from './../../../context/blog/blogContext';
import { Accordion, Card } from 'react-bootstrap';

const BlogItems = (props) => {
  const blogContext = useContext(BlogContext);
  const { setCurrent, clearCurrent, deleteBlog } = blogContext;

  const { _id, title, description, data } = props.blog;
  const [active, setActive] = useState(false);

  const onEdit = () => {
    setCurrent(props.blog);
    props.history.push('/create-new');
  };

  const onDelete = () => {
    clearCurrent();
    deleteBlog(_id);
  };

  return (
    <div className='blog-items'>
      <Accordion
        defaultActiveKey='0'
        className={active === true ? 'active_' : ''}
      >
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey='1'
            className='accordion'
            onClick={() =>
              active === false ? setActive(true) : setActive(false)
            }
          >
            <p className='accordion__title'>{title}</p>
            {/* <i className={`accordion__icon fas fa-chevron-down`}></i> */}
            <p className='accordion__description'>{description}</p>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='1'>
            <Card.Body className='accordion__content'>
              <div
                style={{ whiteSpace: 'pre-wrap' }}
                dangerouslySetInnerHTML={{ __html: data }}
              ></div>
              <div className='buttons'>
                <button className='blog-items__edit' onClick={onEdit}>
                  <i className='fas fa-pencil-alt'></i>Edit
                </button>
                <button className='blog-items__delete' onClick={onDelete}>
                  <i className='fas fa-trash'></i>Delete
                </button>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default BlogItems;
