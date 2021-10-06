import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import '../assets/application.scss';
import ServerContext from './contexts/serverContext.jsx';
import App from './components/App.jsx';
import store from './redux/store';
import {
  addMessage,
  addChannel,
  renameChannel,
  removeChannel,
} from './redux/index.js';

export default () => {
  const socket = io();
  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
  });
  socket.on('renameChannel', (data) => {
    store.dispatch(renameChannel(data));
  });
  socket.on('removeChannel', (id) => {
    store.dispatch(removeChannel(id));
  });
  const serverContextValues = {
    newMessage: (message, acknowledge) => socket.emit('newMessage', message, acknowledge),
    newChannel: (channel, acknowledge) => socket.emit('newChannel', channel, acknowledge),
    renameChannel: (data, acknowledge) => socket.emit('renameChannel', data, acknowledge),
    removeChannel: (id, acknowledge) => socket.emit('removeChannel', id, acknowledge),
  };
  ReactDOM.render(
    <Provider store={store}>
      <ServerContext.Provider value={serverContextValues}>
        <App />
      </ServerContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
