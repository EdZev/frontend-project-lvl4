import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

const aStyle = {
  display: 'block',
};
const ErrorPage = () => (
  <Container fluid="sm" className="alert alert-danger">
    <Row>
      <Col>
        <h1 className="text-center">No such page Err.404</h1>
        <a className="text-center" style={aStyle} href="/">BACK</a>
      </Col>
    </Row>
  </Container>
);

export default ErrorPage;
