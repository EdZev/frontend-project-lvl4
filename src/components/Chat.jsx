import {
  Container,
  Row,
} from 'react-bootstrap';
import axios from 'axios';
import React, { useEffect } from 'react';
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

const Chat = () => {
  useEffect(() => {
    axios.get(routes.dataPath(), { headers: getAuthHeader() })
      .then(({ data }) => {
        store.dispatch(setDataChannels(data));
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsBox />
        <Messages />
      </Row>
    </Container>
  );
};

export default Chat;
