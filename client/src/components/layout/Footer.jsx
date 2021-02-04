import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3' style={{ fontSize: '1.6rem' }}>
            Build and Designed by Prateek Ranjan <br />
            Copyright &copy; by Prateek Ranjan
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
