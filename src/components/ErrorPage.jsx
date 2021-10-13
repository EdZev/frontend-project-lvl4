import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

const ErrorPage = () => {
  const { t } = useTranslation();
  console.log('not Found');
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="text-center align-middle">
          <h1>{t('errors.notFoundPage')}</h1>
          <a href="/">{t('homePage')}</a>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
