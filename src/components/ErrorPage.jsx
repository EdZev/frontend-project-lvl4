import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Navbar,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import routes from '../routes';

const ErrorPage = () => {
  const { t } = useTranslation();

  const aStyle = {
    display: 'block',
  };

  return (
    <div className="d-flex flex-column h-100 py-0">
      <Navbar className="border-bottom bg-white shadow-1 px-0 ">
        <Container>
          <Navbar.Brand to={routes.rootPath()} as={Link}>
            {t('projectName')}
          </Navbar.Brand>
          <Navbar.Toggle />
        </Container>
      </Navbar>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col>
            <h1 className="text-center">{t('errors.notFoundPage')}</h1>
            <a className="text-center" style={aStyle} href="/">{t('homePage')}</a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ErrorPage;
