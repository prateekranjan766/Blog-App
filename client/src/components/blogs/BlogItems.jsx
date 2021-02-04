import { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';

const BlogItems = ({ blog }) => {
  const { title, description, data, user } = blog;
  const [active, setActive] = useState(false);
  return (
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
          <p className='accordion__author'>
            - {user && user.name && user.name.substring(0, 15)}
          </p>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey='1'>
          <Card.Body
            className='accordion__content'
            style={{ whiteSpace: 'pre-wrap' }}
            dangerouslySetInnerHTML={{ __html: data }}
          ></Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default BlogItems;
