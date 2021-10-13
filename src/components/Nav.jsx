import {
  Button,
  Container,
  Navbar,
} from 'react-bootstrap';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';

const Nav = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  const AuthButton = () => {
    const history = useHistory();
    const onLogOut = () => {
      auth.logOut();
      history.push(routes.rootPath());
    };
    return (<Button onClick={onLogOut}>{t('authForm.logout')}</Button>);
  };

  return (
    <Navbar className="border-bottom bg-white shadow-1 px-0 ">
      <Container>
        <Navbar.Brand to={routes.rootPath()} as={Link}>
          {t('projectName')}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {auth.loggedIn && (<AuthButton />)}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Nav;
