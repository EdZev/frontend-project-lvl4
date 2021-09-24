import {
  Button,
  Container,
  Navbar,
  Row,
} from 'react-bootstrap';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authContext from '../contexts/index.jsx';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

import { setDataChannels } from '../redux/index.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get('/api/v1/data', { headers: getAuthHeader() })
      .then(({ data }) => {
        dispatch(setDataChannels(data));
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const AuthButton = () => {
    const auth = useContext(authContext);
    return (<Button onClick={auth.logOut}>Log out</Button>);
  };

  return (
    <div className="d-flex flex-column h-100 py-0">
      <Navbar className="border-bottom bg-white shadow-1 px-0 ">
        <Container>
          <Navbar.Brand>Ed&#39;s chat</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <AuthButton />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
