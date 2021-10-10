import {
  Button,
  Container,
  Navbar,
  Row,
} from 'react-bootstrap';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';
import ChannelsBox from './ChannelsBox.jsx';
import Messages from './Messages.jsx';

import store from '../redux/store.js';
import { setDataChannels } from '../redux/index.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const Layout = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  useEffect(() => {
    axios.get(routes.dataPath(), { headers: getAuthHeader() })
      .then(({ data }) => {
        store.dispatch(setDataChannels(data));
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const AuthButton = () => {
    const history = useHistory();
    const onLogOut = () => {
      auth.logOut();
      history.push(routes.rootPath());
    };
    return (<Button onClick={onLogOut}>{t('authForm.logout')}</Button>);
  };

  return (
    <div className="d-flex flex-column h-100 py-0">
      <Navbar className="border-bottom bg-white shadow-1 px-0 ">
        <Container>
          <Navbar.Brand to={routes.rootPath()} as={Link}>
            {t('projectName')}
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <AuthButton />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <ChannelsBox />
          <Messages />
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
